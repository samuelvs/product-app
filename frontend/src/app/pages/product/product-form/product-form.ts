import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../shared/services/product/product.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss'
})
export class ProductFormComponent implements OnInit {
  form: FormGroup;
  currentId = signal<number>(0);
  selectedFile = signal<File | null>(null);
  previewUrl = signal<string | ArrayBuffer | null>(null);

  constructor(private fb: FormBuilder, private productService: ProductService, private route: ActivatedRoute, private router: Router) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      category: [''],
      price: [0, Validators.required],
      stock: [0, Validators.required],
      image: [null]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.currentId.set(+id);
      this.productService.get(this.currentId()).subscribe(p => {
        this.form.patchValue(p);
        this.previewUrl.set(p.image_url || p.image || null);
      });
    }
  }

  onFileChange(event: any) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      this.selectedFile.set(file);
      const reader = new FileReader();
      reader.onload = () => this.previewUrl.set(reader.result as string | ArrayBuffer | null);
      reader.readAsDataURL(file);
    }
  }

  submit() {
    if (this.form.invalid) return;
    const fd = new FormData();
    fd.append('name', this.form.get('name')!.value);
    fd.append('description', this.form.get('description')!.value || '');
    fd.append('category', this.form.get('category')!.value || '');
    fd.append('price', this.form.get('price')!.value);
    fd.append('stock', this.form.get('stock')!.value);
    if (this.selectedFile()) fd.append('image', this.selectedFile()!);

    if (this.currentId()) {
      this.productService.update(this.currentId(), fd).subscribe(() => this.router.navigate(['/products']));
    } else {
      this.productService.create(fd).subscribe(() => this.router.navigate(['/products']));
    }
  }

  goBack() {
    this.router.navigate(['/products']);
  }
}
import { Injectable } from '@angular/core';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';

@Injectable({ providedIn: 'root' })
export class DocxService {
  constructor(private http: HttpClient) {}

  async generate(templatePath: string, data: any, filename = 'relatorio.docx') {
    const arrayBuffer = await this.http.get(templatePath, { responseType: 'arraybuffer' }).toPromise();
    if (!arrayBuffer) {
      throw new Error('Template file not found');
    }
    const zip = new PizZip(arrayBuffer);
    const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
    doc.setData(data);
    try { doc.render(); }
    catch (err) { console.error('Docx render error', err); throw err; }
    const blob = doc.getZip().generate({ type: 'blob' });
    saveAs(blob, filename);
  }
}

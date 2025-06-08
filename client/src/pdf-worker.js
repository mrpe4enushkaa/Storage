import { GlobalWorkerOptions } from 'pdfjs-dist/build/pdf';

GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url
).toString();
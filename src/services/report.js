import api from "@/plugins/api";
import generateReport from "@/plugins/genai";
import html2pdf from "html2pdf.js";

async function reportBatch(batchId) {
  try {
    const { data } = await api.get(`/report/${batchId}`);
    const reportContent = await generateReport(data);

    const element = document.createElement("div");
    element.innerHTML = reportContent;

    const opt = {
      margin: 10,
      filename: 'relatorio.pdf',
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    await html2pdf().set(opt).from(element).save();
  } catch (error) {
    console.error("Erro ao gerar relatório:", error);
  }
}

export { reportBatch };

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import api from "@/plugins/api";

async function reportBatch(batchId) {
  try {
    const { data } = await api.get(`/report/${batchId}`);
    const { batch, rolls } = data;

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    doc.setFontSize(18);
    doc.text("Relatório de Lote", 105, 20, { align: "center" });

    if (batch.cover?.url) {
      const image = await loadImageAsBase64(batch.cover.url);
      doc.addImage(image, "PNG", 15, 30, 40, 40);
    }

    doc.setFontSize(12);
    doc.text("Informações do Lote", 15, 80);
    doc.setFontSize(10);

    const info = [
      [`ID`, batch.id],
      [`Material`, batch.material],
      [`Composição`, batch.composition],
      [`Quantidade`, batch.qtd],
      [`Peso Total (kg)`, batch.kg],
      [`Preço`, batch.price],
      [`Nota Fiscal`, batch.invoice],
      [`Status`, batch.status],
    ];

    let y = 85;
    info.forEach(([label, value]) => {
      doc.text(`${label}: ${value}`, 20, y);
      y += 6;
    });

    doc.setFontSize(12);
    doc.text("Fornecedor", 15, y + 4);
    doc.setFontSize(10);
    doc.text(`Nome: ${batch.supplier?.name || "-"}`, 20, y + 10);
    doc.text(`CNPJ: ${batch.supplier?.cnpj || "-"}`, 20, y + 16);
    doc.text(
      `Endereço: ${batch.supplier?.address?.street || "-"}, nº ${
        batch.supplier?.address?.number || "-"
      }`,
      20,
      y + 22
    );

    const rollsTable = rolls.map((r) => [
      r.production_order,
      r.kg,
      r.nonconformity ? "Sim" : "Não",
      r.color || "-",
    ]);

    autoTable(doc, {
      startY: y + 35,
      head: [["Ordem de Produção", "Peso (kg)", "Não Conformidade", "Cor"]],
      body: rollsTable,
      theme: "striped",
      headStyles: { fillColor: [40, 40, 40] },
    });

    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(9);
    doc.text(
      `Gerado em ${new Date().toLocaleDateString("pt-BR")}`,
      15,
      pageHeight - 10
    );

    doc.output("dataurlnewwindow");

  } catch (error) {
    console.error("Erro ao gerar relatório:", error);
  }
}

async function loadImageAsBase64(url) {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

export { reportBatch };

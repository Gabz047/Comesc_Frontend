import api from "@/plugins/api"
async function reportBatch(batchId) {
  try {
    const response = await api.get(`/report/${batchId}`, {
      responseType: 'blob',
    })

    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'relatorio.pdf')
    document.body.appendChild(link)
    link.click()
    link.remove()
  } catch (error) {
    console.error('Erro ao gerar relatório:', error)
  }
}

export { reportBatch };

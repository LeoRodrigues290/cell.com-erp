export default function ConfirmarFinalizacaoModal({
                                                      onConfirmar,
                                                      onCancelar,
                                                  }: any) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-md w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Finalizar Serviço</h2>
                <p>Tem certeza que deseja finalizar este serviço?</p>
                <div className="flex justify-end mt-6 gap-4">
                    <button
                        onClick={onCancelar}
                        className="px-4 py-2 border rounded"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirmar}
                        className="px-4 py-2 bg-green-500 text-white rounded"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
}

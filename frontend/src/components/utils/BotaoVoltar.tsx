// components/utils/BotaoVoltar.tsx

interface BotaoVoltarProps {
  cor?: 'blue' | 'purple' | 'gray' | 'green'
  texto?: string
}

export default function BotaoVoltar({
  cor = 'blue',
  texto = 'Voltar para Página Anterior'
}: BotaoVoltarProps) {
  
  const cores = {
    blue: 'bg-blue-600 hover:bg-blue-700',
    purple: 'bg-purple-600 hover:bg-purple-700',
    gray: 'bg-gray-700 hover:bg-gray-800',
    green: 'bg-green-600 hover:bg-green-700'
  }

  return (
    <div className="max-w-4xl mx-auto px-4 mt-12 mb-8">
      <div className="flex justify-center">
        <button
          onClick={() => window.history.back()}
          className={`flex items-center gap-2 ${cores[cor]} text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg`}
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          {texto}
        </button>
      </div>
    </div>
  )
}
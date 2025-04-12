'use client'

import { useState } from 'react'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { graphqlValidatorSchema } from '@/utils/validations'

interface GraphQLFormProps {
  onSubmit: (data: {
    url: string
    headers: { key: string; value: string }[]
    query: string
    variables?: string
    operationName?: string
  }) => void
  isLoading?: boolean
}

export function GraphQLForm({ onSubmit, isLoading }: GraphQLFormProps) {
  const [url, setUrl] = useState('')
  const [headers, setHeaders] = useState<{ key: string; value: string }[]>([
    { key: 'Content-Type', value: 'application/json' }
  ])
  const [query, setQuery] = useState('')
  const [variables, setVariables] = useState('')
  const [operationName, setOperationName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const urlSchema = z.string().url()
      urlSchema.parse(url)

      if (!query.trim()) {
        setError('A query GraphQL é obrigatória')
        return
      }

      onSubmit({
        url,
        headers,
        query,
        variables: variables.trim() ? variables : undefined,
        operationName: operationName.trim() ? operationName : undefined
      })
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError('URL inválida')
      }
    }
  }

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }])
  }

  const updateHeader = (index: number, field: 'key' | 'value', value: string) => {
    const newHeaders = [...headers]
    newHeaders[index][field] = value
    setHeaders(newHeaders)
  }

  const removeHeader = (index: number) => {
    setHeaders(headers.filter((_, i) => i !== index))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nova Requisição GraphQL</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="URL do Endpoint GraphQL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Headers</h3>
              <Button type="button" variant="outline" size="sm" onClick={addHeader}>
                Adicionar Header
              </Button>
            </div>
            {headers.map((header, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="Nome"
                  value={header.key}
                  onChange={(e) => updateHeader(index, 'key', e.target.value)}
                />
                <Input
                  placeholder="Valor"
                  value={header.value}
                  onChange={(e) => updateHeader(index, 'value', e.target.value)}
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeHeader(index)}
                >
                  X
                </Button>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Query</h3>
            <Textarea
              placeholder={`query ExampleQuery {
  user(id: "1") {
    id
    name
    email
  }
}`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows={8}
              className="font-mono"
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Variables (opcional)</h3>
            <Textarea
              placeholder={`{
  "id": "1"
}`}
              value={variables}
              onChange={(e) => setVariables(e.target.value)}
              rows={4}
              className="font-mono"
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Nome da Operação (opcional)</h3>
            <Input
              placeholder="ExampleQuery"
              value={operationName}
              onChange={(e) => setOperationName(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Enviando...' : 'Enviar'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
} 
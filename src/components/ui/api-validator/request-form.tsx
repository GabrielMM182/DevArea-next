'use client'

import { useState } from 'react'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { RequestMethod } from '@/store/validatorApi'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { apiValidatorSchema } from '@/utils/validations'

const httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] as const

interface RequestFormProps {
  onSubmit: (data: {
    url: string
    method: RequestMethod
    headers: { key: string; value: string }[]
    body?: string
  }) => void
  isLoading?: boolean
}

export function RequestForm({ onSubmit, isLoading }: RequestFormProps) {
  const [url, setUrl] = useState('')
  const [method, setMethod] = useState<RequestMethod>('GET')
  const [headers, setHeaders] = useState<{ key: string; value: string }[]>([])
  const [body, setBody] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const urlSchema = z.string().url()
      urlSchema.parse(url)

      onSubmit({
        url,
        method,
        headers,
        body: ['POST', 'PUT', 'PATCH'].includes(method) ? body : undefined
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
        <CardTitle>Nova Requisição</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <Select value={method} onValueChange={(v) => setMethod(v as RequestMethod)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Método" />
              </SelectTrigger>
              <SelectContent>
                {httpMethods.map((method) => (
                  <SelectItem key={method} value={method}>
                    {method}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="URL da API"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
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

          {['POST', 'PUT', 'PATCH'].includes(method) && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Body</h3>
              <Textarea
                placeholder="JSON body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={5}
              />
            </div>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Enviando...' : 'Enviar'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
} 
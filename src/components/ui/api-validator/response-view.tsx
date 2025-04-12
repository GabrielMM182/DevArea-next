'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'

interface ResponseViewProps {
  statusCode?: number
  responseTime?: number
  data?: any
  error?: string
}

const getStatusColor = (status?: number) => {
  if (!status) return 'default'
  if (status < 300) return 'success'
  if (status < 400) return 'warning'
  return 'destructive'
}

export function ResponseView({ statusCode, responseTime, data, error }: ResponseViewProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Resposta</CardTitle>
          <div className="flex gap-2">
            {statusCode && (
              <Badge variant={getStatusColor(statusCode) as any}>
                Status: {statusCode}
              </Badge>
            )}
            {responseTime && (
              <Badge variant="outline">
                Tempo: {responseTime}ms
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          {error ? (
            <pre className="text-red-500 whitespace-pre-wrap">{error}</pre>
          ) : (
            <pre className="whitespace-pre-wrap">
              {data ? JSON.stringify(data, null, 2) : 'Aguardando requisição...'}
            </pre>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
} 
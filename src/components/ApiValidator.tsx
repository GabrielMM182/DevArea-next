'use client'

import { useState } from 'react'
import { RequestForm } from './ui/api-validator/request-form'
import { ResponseView } from './ui/api-validator/response-view'
import { useApiValidatorStore } from '@/store/validatorApi'
import { RequestMethod } from '@/store/validatorApi'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

export function ApiValidator() {
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<{
    statusCode?: number
    responseTime?: number
    data?: any
    error?: string
  }>({})

  const { addRequest, requests } = useApiValidatorStore()

  const handleSubmit = async (data: {
    url: string
    method: RequestMethod
    headers: { key: string; value: string }[]
    body?: string
  }) => {
    setIsLoading(true)
    const startTime = performance.now()

    try {
      const headers = new Headers()
      data.headers.forEach(({ key, value }) => {
        if (key && value) headers.append(key, value)
      })

      const response = await fetch(data.url, {
        method: data.method,
        headers,
        body: data.body ? data.body : undefined
      })

      const responseData = await response.json()
      const endTime = performance.now()

      setResponse({
        statusCode: response.status,
        responseTime: Math.round(endTime - startTime),
        data: responseData
      })

      addRequest({
        url: data.url,
        method: data.method,
        headers: data.headers,
        body: data.body
      })
    } catch (error) {
      setResponse({
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <RequestForm onSubmit={handleSubmit} isLoading={isLoading} />
          
          {requests.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Histórico</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px]">
                  <div className="space-y-2">
                    {requests.map((request) => (
                      <div
                        key={request.id}
                        className="p-2 border rounded hover:bg-accent cursor-pointer"
                        onClick={() =>
                          handleSubmit({
                            url: request.url,
                            method: request.method,
                            headers: request.headers,
                            body: request.body
                          })
                        }
                      >
                        <div className="flex justify-between">
                          <span className="font-medium">{request.method}</span>
                          <span className="text-sm text-muted-foreground">
                            {new Date(request.createdAt as Date).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm truncate">{request.url}</div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          )}
        </div>

        <ResponseView {...response} />
      </div>
    </div>
  )
} 
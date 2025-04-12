'use client'

import { useState } from 'react'
import { RestForm } from './ui/api-validator/request-form'
import { GraphQLForm } from './ui/api-validator/graphql-form'
import { ResponseView } from './ui/api-validator/response-view'
import { useApiValidatorStore, RequestMethod, RequestType } from '@/store/validatorApi'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function ApiValidator() {
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<{
    statusCode?: number
    responseTime?: number
    data?: any
    error?: string
  }>({})

  const { 
    requestType, 
    setRequestType, 
    restRequests, 
    graphqlRequests, 
    addRestRequest, 
    addGraphQLRequest 
  } = useApiValidatorStore()

  const handleRestSubmit = async (data: {
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

      addRestRequest({
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

  const handleGraphQLSubmit = async (data: {
    url: string
    headers: { key: string; value: string }[]
    query: string
    variables?: string
    operationName?: string
  }) => {
    setIsLoading(true)
    const startTime = performance.now()

    try {
      const headers = new Headers()
      data.headers.forEach(({ key, value }) => {
        if (key && value) headers.append(key, value)
      })

      // Construir payload GraphQL
      const payload = {
        query: data.query,
        variables: data.variables ? JSON.parse(data.variables) : undefined,
        operationName: data.operationName
      }

      const response = await fetch(data.url, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      })

      const responseData = await response.json()
      const endTime = performance.now()

      setResponse({
        statusCode: response.status,
        responseTime: Math.round(endTime - startTime),
        data: responseData
      })

      addGraphQLRequest({
        url: data.url,
        headers: data.headers,
        query: data.query,
        variables: data.variables,
        operationName: data.operationName
      })
    } catch (error) {
      setResponse({
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleTabChange = (value: string) => {
    setRequestType(value as RequestType)
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <Tabs 
        defaultValue={requestType} 
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="rest">REST API</TabsTrigger>
          <TabsTrigger value="graphql">GraphQL</TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <TabsContent value="rest" className="mt-0">
              <RestForm onSubmit={handleRestSubmit} isLoading={isLoading} />
              
              {restRequests.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Histórico REST</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[200px]">
                      <div className="space-y-2">
                        {restRequests.map((request) => (
                          <div
                            key={request.id}
                            className="p-2 border rounded hover:bg-accent cursor-pointer"
                            onClick={() =>
                              handleRestSubmit({
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
            </TabsContent>
            
            <TabsContent value="graphql" className="mt-0">
              <GraphQLForm onSubmit={handleGraphQLSubmit} isLoading={isLoading} />
              
              {graphqlRequests.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Histórico GraphQL</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[200px]">
                      <div className="space-y-2">
                        {graphqlRequests.map((request) => (
                          <div
                            key={request.id}
                            className="p-2 border rounded hover:bg-accent cursor-pointer"
                            onClick={() =>
                              handleGraphQLSubmit({
                                url: request.url,
                                headers: request.headers,
                                query: request.query,
                                variables: request.variables,
                                operationName: request.operationName
                              })
                            }
                          >
                            <div className="flex justify-between">
                              <span className="font-medium">GraphQL</span>
                              <span className="text-sm text-muted-foreground">
                                {new Date(request.createdAt as Date).toLocaleString()}
                              </span>
                            </div>
                            <div className="text-sm truncate">{request.url}</div>
                            <div className="text-xs text-muted-foreground truncate">
                              {request.operationName || 'Query sem nome'}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </div>

          <ResponseView {...response} />
        </div>
      </Tabs>
    </div>
  )
} 
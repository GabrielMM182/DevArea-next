import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">DevArea Tools</h1>
        <p className="text-xl text-muted-foreground">
          Ferramentas úteis para o seu dia a dia como desenvolvedor
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Gerador de Senha</CardTitle>
            <CardDescription>
              Crie senhas seguras com configurações personalizadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Gere senhas com opções de comprimento e tipos de caracteres incluindo
              letras maiúsculas, minúsculas, números e símbolos.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/password-generator">Acessar</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Encurtador de URL</CardTitle>
            <CardDescription>
              Transforme URLs longas em links curtos e compartilháveis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Encurte qualquer URL para facilitar o compartilhamento em redes sociais,
              mensagens ou emails.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/shorten">Acessar</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversor de Moeda</CardTitle>
            <CardDescription>
              Converta valores entre diferentes moedas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Faça conversões entre diferentes moedas com taxas de câmbio atualizadas.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/conversor">Acessar</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Validador de API</CardTitle>
            <CardDescription>
              Teste e valide suas APIs REST e GraphQL
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Faça requisições HTTP e GraphQL, adicione headers customizados, visualize respostas
              e valide schemas JSON.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/api-validator">Acessar</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gerador de README</CardTitle>
            <CardDescription>
              Crie arquivos README.md para seus projetos facilmente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Gere READMEs profissionais preenchendo um formulário interativo com
              informações como tecnologias, instalação, uso e contribuição.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/readme-generator">Acessar</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { useReadmeStore } from '@/store/readme';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Copy, Download, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export function ReadmeGenerator() {
  const { readmeData, updateReadmeData, resetReadmeData } = useReadmeStore();
  const [activeTab, setActiveTab] = useState<string>('form');
  
  const handleInputChange = (field: string, value: string | boolean) => {
    updateReadmeData({ [field]: value });
  };

  const generateReadmeContent = (): string => {
    const { 
      projectName, description, technologies, installation, usage, 
      contributing, license, features, prerequisites, testing,
      includeFeatures, includePrerequisites, includeTesting
    } = readmeData;

    let techList = '';
    if (technologies.trim()) {
      techList = technologies
        .split(',')
        .map(tech => `- ${tech.trim()}`)
        .join('\n');
    }

    let content = `# ${projectName || 'Nome do Projeto'}

${description || 'Descrição do projeto aqui.'}

${includeFeatures && features ? `
## Funcionalidades

${features}
` : ''}

## Tecnologias Utilizadas

${techList || '- Tecnologia 1\n- Tecnologia 2\n- Tecnologia 3'}

${includePrerequisites && prerequisites ? `
## Pré-requisitos

${prerequisites}
` : ''}

## Instalação

\`\`\`bash
${installation || '# Comandos de instalação\nnpm install\n# ou\nyarn install'}
\`\`\`

## Como Usar

\`\`\`bash
${usage || '# Comandos para executar o projeto\nnpm run dev\n# ou\nyarn dev'}
\`\`\`

${includeTesting && testing ? `
## Testes

\`\`\`bash
${testing}
\`\`\`
` : ''}

## Como Contribuir

${contributing || '1. Faça um fork do projeto\n2. Crie uma branch para sua feature (`git checkout -b feature/nome-da-feature`)\n3. Faça commit das suas alterações (`git commit -m "Adiciona nova feature"`)\n4. Faça push para a branch (`git push origin feature/nome-da-feature`)\n5. Abra um Pull Request'}

## Licença

${license || 'Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE.md para mais detalhes'}
`;

    return content;
  };

  const copyToClipboard = () => {
    const content = generateReadmeContent();
    navigator.clipboard.writeText(content)
      .then(() => toast.success('README copiado para a área de transferência!'))
      .catch(() => toast.error('Erro ao copiar README'));
  };

  const downloadReadme = () => {
    const content = generateReadmeContent();
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('README.md baixado com sucesso!');
  };

  const resetForm = () => {
    resetReadmeData();
    toast.info('Formulário resetado');
  };

  return (
    <div className="container py-8">
      <Tabs defaultValue="form" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="form">Formulário</TabsTrigger>
          <TabsTrigger value="preview">Visualização</TabsTrigger>
        </TabsList>
        
        <TabsContent value="form">
          <Card>
            <CardHeader>
              <CardTitle>Gerador de README.md</CardTitle>
              <CardDescription>
                Preencha o formulário para gerar um README.md para seu projeto
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="projectName">Nome do Projeto *</Label>
                <Input 
                  id="projectName" 
                  value={readmeData.projectName} 
                  onChange={(e) => handleInputChange('projectName', e.target.value)}
                  placeholder="Ex: Meu Projeto Incrível"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea 
                  id="description" 
                  value={readmeData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Uma breve descrição sobre o que o projeto faz"
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="includeFeatures" 
                  checked={readmeData.includeFeatures}
                  onCheckedChange={(checked) => handleInputChange('includeFeatures', !!checked)}
                />
                <Label htmlFor="includeFeatures">Incluir seção de Funcionalidades</Label>
              </div>
              
              {readmeData.includeFeatures && (
                <div className="space-y-2 pl-6">
                  <Label htmlFor="features">Funcionalidades</Label>
                  <Textarea 
                    id="features" 
                    value={readmeData.features}
                    onChange={(e) => handleInputChange('features', e.target.value)}
                    placeholder="- Funcionalidade 1&#10;- Funcionalidade 2&#10;- Funcionalidade 3"
                    rows={3}
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="technologies">Tecnologias (separadas por vírgula) *</Label>
                <Input 
                  id="technologies" 
                  value={readmeData.technologies}
                  onChange={(e) => handleInputChange('technologies', e.target.value)}
                  placeholder="React, Next.js, TypeScript, Tailwind CSS"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="includePrerequisites" 
                  checked={readmeData.includePrerequisites}
                  onCheckedChange={(checked) => handleInputChange('includePrerequisites', !!checked)}
                />
                <Label htmlFor="includePrerequisites">Incluir seção de Pré-requisitos</Label>
              </div>
              
              {readmeData.includePrerequisites && (
                <div className="space-y-2 pl-6">
                  <Label htmlFor="prerequisites">Pré-requisitos</Label>
                  <Textarea 
                    id="prerequisites" 
                    value={readmeData.prerequisites}
                    onChange={(e) => handleInputChange('prerequisites', e.target.value)}
                    placeholder="- Node.js 14+&#10;- npm ou yarn&#10;- PostgreSQL"
                    rows={3}
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="installation">Instruções de Instalação *</Label>
                <Textarea 
                  id="installation" 
                  value={readmeData.installation}
                  onChange={(e) => handleInputChange('installation', e.target.value)}
                  placeholder="# Clone o repositório&#10;git clone https://github.com/seu-usuario/seu-projeto.git&#10;cd seu-projeto&#10;&#10;# Instale as dependências&#10;npm install"
                  rows={4}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="usage">Como Usar *</Label>
                <Textarea 
                  id="usage" 
                  value={readmeData.usage}
                  onChange={(e) => handleInputChange('usage', e.target.value)}
                  placeholder="npm run dev&#10;# ou&#10;yarn dev"
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="includeTesting" 
                  checked={readmeData.includeTesting}
                  onCheckedChange={(checked) => handleInputChange('includeTesting', !!checked)}
                />
                <Label htmlFor="includeTesting">Incluir seção de Testes</Label>
              </div>
              
              {readmeData.includeTesting && (
                <div className="space-y-2 pl-6">
                  <Label htmlFor="testing">Instruções de Testes</Label>
                  <Textarea 
                    id="testing" 
                    value={readmeData.testing}
                    onChange={(e) => handleInputChange('testing', e.target.value)}
                    placeholder="npm test&#10;# ou&#10;yarn test"
                    rows={3}
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="contributing">Como Contribuir</Label>
                <Textarea 
                  id="contributing" 
                  value={readmeData.contributing}
                  onChange={(e) => handleInputChange('contributing', e.target.value)}
                  placeholder="1. Faça um fork do projeto&#10;2. Crie uma branch para sua feature&#10;3. Faça commit das suas alterações&#10;4. Faça push para a branch&#10;5. Abra um Pull Request"
                  rows={5}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="license">Licença</Label>
                <Input 
                  id="license" 
                  value={readmeData.license}
                  onChange={(e) => handleInputChange('license', e.target.value)}
                  placeholder="MIT, Apache 2.0, GNU GPL v3.0"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={resetForm} className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Resetar
              </Button>
              <Button onClick={() => setActiveTab('preview')} className="flex items-center gap-2">
                Visualizar
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Visualização do README.md</CardTitle>
              <CardDescription>
                Pré-visualização do arquivo README.md que será gerado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md p-4 bg-muted/50 overflow-auto max-h-[60vh]">
                <pre className="whitespace-pre-wrap font-mono text-sm">
                  {generateReadmeContent()}
                </pre>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab('form')} className="flex items-center gap-2">
                Voltar ao Formulário
              </Button>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={copyToClipboard} className="flex items-center gap-2">
                  <Copy className="h-4 w-4" />
                  Copiar
                </Button>
                <Button onClick={downloadReadme} className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Baixar README.md
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ToolCard } from '@/components/ui/tool-card';
import { Download, Search, Trash2, FileText, Layers, Settings, Monitor, Code2, Copy } from 'lucide-react';
import { useGitignoreGenerator, GitignoreTemplate } from './useGitignoreGenerator';
import { toast } from 'sonner';

const categoryIcons = {
  languages: Code2,
  frameworks: Layers,
  tools: Settings,
  os: Monitor,
  editors: FileText
};

const categoryLabels = {
  languages: 'Languages',
  frameworks: 'Frameworks',
  tools: 'Tools',
  os: 'Operating Systems',
  editors: 'Editors & IDEs'
};

const GitignoreGenerator: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('templates');
  
  const {
    selectedTemplates,
    customRules,
    generatedContent,
    searchTerm,
    templatesByCategory,
    generateGitignore,
    toggleTemplate,
    selectMultipleTemplates,
    setCustomRules,
    setSearchTerm,
    clearAll,
    downloadGitignore,
    copyToClipboard
  } = useGitignoreGenerator();

  const quickStart = (templateIds: string[]) => {
    selectMultipleTemplates(templateIds);
    setTimeout(() => {
      generateGitignore();
      setTimeout(() => {
        setActiveTab('preview');
        toast.success('Quick start template generated!');
      }, 100);
    }, 50);
  };

  const renderTemplateCard = (template: GitignoreTemplate) => {
    const isSelected = selectedTemplates.includes(template.id);
    
    return (
      <Card
        key={template.id}
        className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
          isSelected ? 'ring-2 ring-primary bg-primary/5' : ''
        }`}
        onClick={() => toggleTemplate(template.id)}
      >
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              checked={isSelected}
              onChange={() => {}}
              className="pointer-events-none"
            />
            <div className="flex-1">
              <h4 className="font-medium">{template.name}</h4>
              <p className="text-sm text-muted-foreground">
                {template.content.filter(line => !line.startsWith('#') && line.trim()).length} rules
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderCategorySection = (category: keyof typeof templatesByCategory) => {
    const templates = templatesByCategory[category];
    if (templates.length === 0) return null;

    const IconComponent = categoryIcons[category as keyof typeof categoryIcons];
    
    return (
      <div key={category} className="space-y-3">
        <div className="flex items-center space-x-2">
          <IconComponent className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">{categoryLabels[category as keyof typeof categoryLabels]}</h3>
          <Badge variant="secondary">{templates.length}</Badge>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {templates.map(renderTemplateCard)}
        </div>
      </div>
    );
  };

  return (
    <ToolCard
      title="Gitignore Generator"
      description="Generate customized .gitignore files for your projects with templates for popular languages, frameworks, and tools"
    >
      <Tabs defaultValue="templates" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="preview">Preview & Download</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search templates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button
                variant="outline"
                onClick={clearAll}
                className="sm:w-auto w-full"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </div>

            {/* Quick Start Options */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Start</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => quickStart(['node', 'windows', 'vscode'])}
                  >
                    Node.js Project
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => quickStart(['react', 'node', 'windows', 'vscode'])}
                  >
                    React App
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => quickStart(['nextjs', 'node', 'windows', 'vscode'])}
                  >
                    Next.js App
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => quickStart(['vue', 'node', 'windows', 'vscode'])}
                  >
                    Vue.js App
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => quickStart(['python', 'windows', 'vscode'])}
                  >
                    Python Project
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => quickStart(['java', 'windows', 'intellij'])}
                  >
                    Java Project
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => quickStart(['csharp', 'windows', 'vscode'])}
                  >
                    C# Project
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => quickStart(['go', 'windows', 'vscode'])}
                  >
                    Go Project
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => quickStart(['rust', 'windows', 'vscode'])}
                  >
                    Rust Project
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => quickStart(['laravel', 'php', 'windows', 'vscode'])}
                  >
                    Laravel
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => quickStart(['django', 'python', 'windows', 'vscode'])}
                  >
                    Django
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => quickStart(['fastapi', 'python', 'windows', 'vscode'])}
                  >
                    FastAPI
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => quickStart(['flask', 'python', 'windows', 'vscode'])}
                  >
                    Flask
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => quickStart(['express', 'node', 'windows', 'vscode'])}
                  >
                    Express.js
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {selectedTemplates.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Selected Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {selectedTemplates.map(templateId => {
                    const template = Object.values(templatesByCategory)
                      .flat()
                      .find(t => t.id === templateId);
                    
                    return template ? (
                      <Badge
                        key={templateId}
                        variant="default"
                        className="cursor-pointer"
                        onClick={() => toggleTemplate(templateId)}
                      >
                        {template.name} ×
                      </Badge>
                    ) : null;
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          <ScrollArea className="h-[600px]">
            <div className="space-y-8">
              {Object.keys(categoryLabels).map(category =>
                renderCategorySection(category as keyof typeof templatesByCategory)
              )}
            </div>
          </ScrollArea>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Custom Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder={`Add custom ignore rules here, one per line:

# Custom files
*.custom
/my-folder/
temp-*.txt`}
                value={customRules}
                onChange={(e) => setCustomRules(e.target.value)}
                rows={8}
                className="font-mono"
              />
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button
              onClick={() => {
                generateGitignore();
                setTimeout(() => setActiveTab('preview'), 100); // Small delay to ensure state update
              }}
              disabled={selectedTemplates.length === 0 && !customRules.trim()}
              className="w-full sm:w-auto"
            >
              <FileText className="w-4 h-4 mr-2" />
              Generate .gitignore
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          {generatedContent && generatedContent.length > 0 ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Generated .gitignore</h3>
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    onClick={async () => {
                      const success = await copyToClipboard();
                      if (success) {
                        toast.success('Copied to clipboard!');
                      } else {
                        toast.error('Failed to copy to clipboard');
                      }
                    }}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                  <Button onClick={() => {
                    downloadGitignore();
                    toast.success('.gitignore file downloaded successfully!');
                  }}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>

              <Card>
                <CardContent className="p-0">
                  <ScrollArea className="h-[500px]">
                    <pre className="p-6 text-sm font-mono whitespace-pre-wrap break-words">
                      {generatedContent}
                    </pre>
                  </ScrollArea>
                </CardContent>
              </Card>

              <div className="text-center text-sm text-muted-foreground">
                Total lines: {generatedContent.split('\n').length} | 
                Rules: {generatedContent.split('\n').filter(line => 
                  line.trim() && !line.startsWith('#') && !line.trim().startsWith('#')
                ).length}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No .gitignore Generated Yet</h3>
              <p className="text-muted-foreground mb-4">
                Go to the Templates tab, select some templates or add custom rules, then click "Generate .gitignore".
              </p>
              <div className="space-x-2">
                <Button onClick={() => setActiveTab('templates')}>
                  Go to Templates
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    generateGitignore();
                    if (generatedContent && generatedContent.length > 0) {
                      toast.success('.gitignore generated successfully!');
                    } else {
                      toast.error('Please select templates or add custom rules first.');
                    }
                  }}
                  disabled={selectedTemplates.length === 0 && !customRules.trim()}
                >
                  Try Generate
                </Button>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </ToolCard>
  );
};

export default GitignoreGenerator;
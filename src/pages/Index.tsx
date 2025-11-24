import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

interface ContentItem {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'news' | 'update' | 'custom';
  customLabel?: string;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'news' | 'updates' | 'rules'>('home');
  const [items, setItems] = useState<ContentItem[]>([
    {
      id: '1',
      title: 'Открытие сервера [JAIL] Тюрьма',
      content: 'Сервер [JAIL] Тюрьма заточение открыт! Приглашаем всех игроков присоединиться к нашему сообществу.',
      date: '2024-11-24',
      type: 'news',
    },
    {
      id: '2',
      title: 'Обновление игрового баланса',
      content: 'Произведена балансировка игровых механик, исправлены ошибки, добавлены новые функции.',
      date: '2024-11-23',
      type: 'update',
    },
  ]);
  const [rulesLink, setRulesLink] = useState('https://ct-game-rules-site--preview.poehali.dev/');
  const isAdmin = true;

  const [newItem, setNewItem] = useState({
    title: '',
    content: '',
    type: 'news' as 'news' | 'update' | 'custom',
    customLabel: '',
  });



  const handleAddItem = () => {
    if (!newItem.title || !newItem.content) {
      toast.error('Заполните все поля');
      return;
    }

    const item: ContentItem = {
      id: Date.now().toString(),
      title: newItem.title,
      content: newItem.content,
      date: new Date().toISOString().split('T')[0],
      type: newItem.type,
      customLabel: newItem.type === 'custom' ? newItem.customLabel : undefined,
    };

    setItems([item, ...items]);
    setNewItem({ title: '', content: '', type: 'news', customLabel: '' });
    toast.success('Запись добавлена');
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    toast.success('Запись удалена');
  };

  const filteredItems = items.filter(item => {
    if (activeTab === 'home') return true;
    if (activeTab === 'news') return item.type === 'news';
    if (activeTab === 'updates') return item.type === 'update';
    return false;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
      
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Gamepad2" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  [JAIL] Тюрьма
                </h1>
                <p className="text-xs text-muted-foreground">Заточение</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-2">
              <Button
                variant={activeTab === 'home' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('home')}
                className="hover-scale"
              >
                <Icon name="Home" size={18} className="mr-2" />
                Главная
              </Button>
              <Button
                variant={activeTab === 'news' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('news')}
                className="hover-scale"
              >
                <Icon name="Newspaper" size={18} className="mr-2" />
                Новости
              </Button>
              <Button
                variant={activeTab === 'updates' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('updates')}
                className="hover-scale"
              >
                <Icon name="Download" size={18} className="mr-2" />
                Обновления
              </Button>
              <Button
                variant={activeTab === 'rules' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('rules')}
                className="hover-scale"
              >
                <Icon name="ScrollText" size={18} className="mr-2" />
                Правила
              </Button>
            </nav>


          </div>

          <nav className="flex md:hidden items-center gap-2 mt-4 overflow-x-auto pb-2">
            <Button
              variant={activeTab === 'home' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('home')}
            >
              <Icon name="Home" size={16} />
            </Button>
            <Button
              variant={activeTab === 'news' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('news')}
            >
              <Icon name="Newspaper" size={16} />
            </Button>
            <Button
              variant={activeTab === 'updates' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('updates')}
            >
              <Icon name="Download" size={16} />
            </Button>
            <Button
              variant={activeTab === 'rules' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('rules')}
            >
              <Icon name="ScrollText" size={16} />
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 relative z-10">
        {activeTab === 'rules' ? (
          <div className="max-w-2xl mx-auto">
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="ScrollText" size={24} className="text-primary" />
                  Правила сервера
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="rulesLink">Ссылка на правила</Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        id="rulesLink"
                        value={rulesLink}
                        onChange={(e) => setRulesLink(e.target.value)}
                        placeholder="https://..."
                      />
                      <Button onClick={() => toast.success('Ссылка сохранена')}>
                        Сохранить
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <a
                    href={rulesLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                  >
                    <Icon name="ExternalLink" size={20} />
                    <span className="text-lg font-medium">Открыть правила</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            {activeTab === 'home' && (
              <div className="mb-8">
                <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 to-secondary/10 p-8 md:p-12 backdrop-blur-sm">
                  <div className="relative z-10">
                    <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
                      <Icon name="Zap" size={14} className="mr-1" />
                      В34 Онлайн
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                      Добро пожаловать на [JAIL] Тюрьма заточение
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                      Следи за последними новостями, обновлениями и событиями на нашем сервере.
                      Присоединяйся к игровому сообществу!
                    </p>
                  </div>
                  <div className="absolute -right-10 -top-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                  <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
                </div>
              </div>
            )}

            {isAdmin && (
              <Card className="mb-8 border-secondary/20 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Plus" size={24} className="text-secondary" />
                    Добавить запись
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="type">Тип записи</Label>
                    <Select
                      value={newItem.type}
                      onValueChange={(value: 'news' | 'update' | 'custom') =>
                        setNewItem({ ...newItem, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="news">Новость</SelectItem>
                        <SelectItem value="update">Обновление</SelectItem>
                        <SelectItem value="custom">Свой раздел</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {newItem.type === 'custom' && (
                    <div>
                      <Label htmlFor="customLabel">Название раздела</Label>
                      <Input
                        id="customLabel"
                        value={newItem.customLabel}
                        onChange={(e) =>
                          setNewItem({ ...newItem, customLabel: e.target.value })
                        }
                        placeholder="Например: Турниры"
                      />
                    </div>
                  )}

                  <div>
                    <Label htmlFor="title">Заголовок</Label>
                    <Input
                      id="title"
                      value={newItem.title}
                      onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                      placeholder="Введите заголовок"
                    />
                  </div>

                  <div>
                    <Label htmlFor="content">Содержание</Label>
                    <Textarea
                      id="content"
                      value={newItem.content}
                      onChange={(e) => setNewItem({ ...newItem, content: e.target.value })}
                      placeholder="Введите текст"
                      rows={4}
                    />
                  </div>

                  <Button onClick={handleAddItem} className="w-full">
                    <Icon name="Plus" size={18} className="mr-2" />
                    Добавить
                  </Button>
                </CardContent>
              </Card>
            )}

            <div className="space-y-6">
              {filteredItems.length === 0 ? (
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardContent className="py-12 text-center">
                    <Icon name="Inbox" size={48} className="mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Записей пока нет</p>
                  </CardContent>
                </Card>
              ) : (
                filteredItems.map((item) => (
                  <Card
                    key={item.id}
                    className="border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-all hover-scale"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge
                              variant={item.type === 'news' ? 'default' : 'secondary'}
                              className="hover-scale"
                            >
                              <Icon
                                name={
                                  item.type === 'news'
                                    ? 'Newspaper'
                                    : item.type === 'update'
                                    ? 'Download'
                                    : 'Star'
                                }
                                size={14}
                                className="mr-1"
                              />
                              {item.type === 'news'
                                ? 'Новость'
                                : item.type === 'update'
                                ? 'Обновление'
                                : item.customLabel}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{item.date}</span>
                          </div>
                          <CardTitle className="text-xl">{item.title}</CardTitle>
                        </div>
                        {isAdmin && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteItem(item.id)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Icon name="Trash2" size={18} />
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{item.content}</p>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </>
        )}
      </main>

      <footer className="border-t border-border/50 mt-16 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>© 2024 [JAIL] Тюрьма заточение. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
import { useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import { contentApi } from '@/lib/api';
import { SectionConfig, FieldConfig } from '@/config/adminSections';

type Row = Record<string, unknown> & { id: number };

const SectionManager = ({ config }: { config: SectionConfig }) => {
  const { toast } = useToast();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Row | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const items = await contentApi.list<Row>(config.key);
      setRows(items);
    } catch (err) {
      toast({ title: 'Ошибка загрузки', description: (err as Error).message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [config.key, toast]);

  useEffect(() => {
    load();
  }, [load]);

  const openCreate = () => {
    const empty: Record<string, unknown> = {};
    config.fields.forEach((f) => {
      empty[f.key] = f.type === 'boolean' ? true : f.type === 'json' ? '' : '';
    });
    setForm(empty);
    setEditing(null);
    setDialogOpen(true);
  };

  const openEdit = (row: Row) => {
    const data: Record<string, unknown> = {};
    config.fields.forEach((f) => {
      let v = row[f.key];
      if (f.type === 'json' && Array.isArray(v)) v = (v as string[]).join('\n');
      data[f.key] = v ?? '';
    });
    setForm(data);
    setEditing(row);
    setDialogOpen(true);
  };

  const buildPayload = () => {
    const payload: Record<string, unknown> = {};
    config.fields.forEach((f) => {
      if (f.readOnly && editing) return;
      let v = form[f.key];
      if (f.type === 'json') {
        v = String(v || '')
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean);
      } else if (f.type === 'number') {
        v = v === '' || v === null ? null : Number(v);
      }
      payload[f.key] = v;
    });
    return payload;
  };

  const save = async () => {
    setSaving(true);
    try {
      const payload = buildPayload();
      if (editing) {
        await contentApi.update(config.key, { id: editing.id, ...payload });
        toast({ title: 'Сохранено', description: 'Запись обновлена.' });
      } else {
        await contentApi.create(config.key, payload);
        toast({ title: 'Создано', description: 'Новая запись добавлена.' });
      }
      setDialogOpen(false);
      load();
    } catch (err) {
      toast({ title: 'Ошибка', description: (err as Error).message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (deleteId === null) return;
    try {
      await contentApi.remove(config.key, deleteId);
      toast({ title: 'Удалено', description: 'Запись удалена.' });
      setDeleteId(null);
      load();
    } catch (err) {
      toast({ title: 'Ошибка', description: (err as Error).message, variant: 'destructive' });
    }
  };

  const tableFields = config.fields.filter((f) => !f.hideInTable);

  const renderCell = (row: Row, f: FieldConfig) => {
    const v = row[f.key];
    if (f.type === 'boolean') {
      return (
        <Badge variant={v ? 'default' : 'outline'} className={v ? 'gold-gradient text-primary-foreground' : ''}>
          {v ? 'Да' : 'Нет'}
        </Badge>
      );
    }
    const str = String(v ?? '');
    return <span className="line-clamp-1 max-w-[220px]">{str.length > 60 ? str.slice(0, 60) + '…' : str}</span>;
  };

  const renderField = (f: FieldConfig) => {
    const val = form[f.key];
    const disabled = f.readOnly && !!editing;
    if (f.type === 'boolean') {
      return (
        <div className="flex items-center gap-3">
          <Switch checked={!!val} onCheckedChange={(c) => setForm({ ...form, [f.key]: c })} />
          <span className="text-sm text-muted-foreground">{val ? 'Да' : 'Нет'}</span>
        </div>
      );
    }
    if (f.type === 'select') {
      return (
        <Select value={String(val || '')} onValueChange={(v) => setForm({ ...form, [f.key]: v })}>
          <SelectTrigger className="border-border bg-background">
            <SelectValue placeholder="Выберите" />
          </SelectTrigger>
          <SelectContent>
            {f.options?.map((o) => (
              <SelectItem key={o} value={o}>
                {o}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }
    if (f.type === 'textarea' || f.type === 'json') {
      return (
        <Textarea
          value={String(val ?? '')}
          disabled={disabled}
          onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
          className="min-h-24 border-border bg-background"
          placeholder={f.type === 'json' ? 'Каждый пункт с новой строки' : ''}
        />
      );
    }
    return (
      <Input
        type={f.type === 'number' ? 'number' : 'text'}
        value={String(val ?? '')}
        disabled={disabled}
        onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
        className="border-border bg-background"
      />
    );
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold">{config.title}</h2>
          <p className="text-sm text-muted-foreground">Всего записей: {rows.length}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={load} className="gold-border bg-transparent text-gold">
            <Icon name="RefreshCw" size={16} />
          </Button>
          <Button onClick={openCreate} className="gold-gradient font-medium text-primary-foreground hover:opacity-90">
            <Icon name="Plus" size={16} className="mr-2" />
            Добавить
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card">
        {loading ? (
          <div className="space-y-2 p-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full bg-secondary" />
            ))}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="w-14">ID</TableHead>
                {tableFields.map((f) => (
                  <TableHead key={f.key}>{f.label}</TableHead>
                ))}
                <TableHead className="w-24 text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={tableFields.length + 2} className="py-10 text-center text-muted-foreground">
                    Нет данных
                  </TableCell>
                </TableRow>
              )}
              {rows.map((row) => (
                <TableRow key={row.id} className="border-border">
                  <TableCell className="font-mono text-xs text-muted-foreground">{row.id}</TableCell>
                  {tableFields.map((f) => (
                    <TableCell key={f.key}>{renderCell(row, f)}</TableCell>
                  ))}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gold" onClick={() => openEdit(row)}>
                        <Icon name="Pencil" size={15} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => setDeleteId(row.id)}
                      >
                        <Icon name="Trash2" size={15} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto border-border bg-card sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">
              {editing ? 'Редактирование' : 'Новая запись'} — {config.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {config.fields.map((f) => (
              <div key={f.key} className="space-y-2">
                <Label>{f.label}</Label>
                {renderField(f)}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} className="border-border">
              Отмена
            </Button>
            <Button onClick={save} disabled={saving} className="gold-gradient font-medium text-primary-foreground">
              {saving ? 'Сохранение...' : 'Сохранить'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId !== null} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent className="border-border bg-card">
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить запись?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Запись будет удалена навсегда.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-border">Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SectionManager;

'use client';

import { useActionState, useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@feature/ui/components/dialog';
import { Button } from '@feature/ui/components/button';
import { Input } from '@feature/ui/components/input';
import { Label } from '@feature/ui/components/label';
import { Textarea } from '@feature/ui/components/textarea';
import { Pencil, Plus } from 'lucide-react';
import {
  addExperienceAction,
  updateExperienceAction,
  type ExperienceItem,
} from '@edupulse/profile';
import type { ApiResponse } from '@edupulse/api-client';

interface ExperienceFormDialogProps {
  mode: 'add' | 'edit';
  index?: number;
  experience?: ExperienceItem;
}

const initialState: ApiResponse<ExperienceItem> = {
  success: false,
  message: '',
  data: {
    title: '',
    company: '',
    period: '',
    description: '',
    achievements: [],
    technologies: [],
  },
};

export function ExperienceFormDialog({
  mode,
  index,
  experience,
}: ExperienceFormDialogProps) {
  const [open, setOpen] = useState(false);

  const boundAction =
    mode === 'edit' && index !== undefined
      ? updateExperienceAction.bind(null, index)
      : addExperienceAction;

  const [state, formAction, isPending] = useActionState(
    boundAction,
    experience
      ? { ...initialState, data: experience }
      : initialState
  );

  useEffect(() => {
    if (state.success) {
      setOpen(false);
    }
  }, [state.success]);

  const defaultValues = mode === 'edit' && experience ? experience : initialState.data;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === 'add' ? (
          <Button
            size="sm"
            variant="ghost"
            className="text-blue-400 hover:text-blue-300"
          >
            <Plus className="h-4 w-4" />
          </Button>
        ) : (
          <Button size="icon" variant="ghost" className="h-8 w-8">
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] bg-card border-border">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'Add Work Experience' : 'Edit Work Experience'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'add'
              ? 'Add a new work experience entry to your resume.'
              : 'Update your work experience details.'}
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Senior Software Engineer"
                defaultValue={defaultValues.title}
                required
                className="bg-background/50"
              />
              {state.error?.errors?.title && (
                <p className="text-sm text-destructive">{state.error.errors.title}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                placeholder="Tech Corp Inc."
                defaultValue={defaultValues.company}
                required
                className="bg-background/50"
              />
              {state.error?.errors?.company && (
                <p className="text-sm text-destructive">{state.error.errors.company}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="period">Period</Label>
              <Input
                id="period"
                name="period"
                type="month"
                placeholder="Jan 2020 - Present"
                defaultValue={defaultValues.period}
                required
                className="bg-background/50"
              />
              {state.error?.errors?.period && (
                <p className="text-sm text-destructive">{state.error.errors.period}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Brief description of your role..."
                defaultValue={defaultValues.description}
                className="min-h-20 resize-none bg-background/50"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="achievements">
                Achievements (one per line)
              </Label>
              <Textarea
                id="achievements"
                name="achievements"
                placeholder="Led team of 5 engineers&#10;Reduced deployment time by 50%&#10;Implemented CI/CD pipeline"
                defaultValue={defaultValues.achievements?.join('\n')}
                className="min-h-24 resize-none bg-background/50"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="technologies">
                Technologies (comma-separated)
              </Label>
              <Input
                id="technologies"
                name="technologies"
                placeholder="React, TypeScript, Node.js, AWS"
                defaultValue={defaultValues.technologies?.join(', ')}
                className="bg-background/50"
              />
            </div>
          </div>
          {state.message && !state.success && (
            <p className="text-sm text-destructive mb-4">{state.message}</p>
          )}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-primary hover:bg-primary/90"
            >
              {isPending
                ? 'Saving...'
                : mode === 'add'
                  ? 'Add Experience'
                  : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

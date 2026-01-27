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
import { Pencil, Plus } from 'lucide-react';
import {
  addEducationAction,
  updateEducationAction,
  type Education,
} from '@edupulse/profile';
import type { ApiResponse } from '@edupulse/api-client';

interface EducationFormDialogProps {
  mode: 'add' | 'edit';
  index?: number;
  education?: Education;
}

const initialState: ApiResponse<Education> = {
  success: false,
  message: '',
  data: {
    degree: '',
    institution: '',
    year: '',
    logo: null,
  },
};

export function EducationFormDialog({
  mode,
  index,
  education,
}: EducationFormDialogProps) {
  const [open, setOpen] = useState(false);

  const boundAction =
    mode === 'edit' && index !== undefined
      ? updateEducationAction.bind(null, index)
      : addEducationAction;

  const [state, formAction, isPending] = useActionState(
    boundAction,
    education
      ? { ...initialState, data: education }
      : initialState
  );

  useEffect(() => {
    if (state.success) {
      setOpen(false);
    }
  }, [state.success]);

  const defaultValues = mode === 'edit' && education ? education : initialState.data;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === 'add' ? (
          <Button
            size="sm"
            variant="outline"
            className="text-blue-400 cursor-pointer hover:text-blue-300 bg-transparent w-full"
          >
            <Plus className="h-4 w-4" />
            Add Education
          </Button>
        ) : (
          <Button size="icon" variant="ghost" className="h-8 w-8">
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-card border-border">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'Add Education' : 'Edit Education'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'add'
              ? 'Add a new education entry to your resume.'
              : 'Update your education details.'}
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="degree">Degree</Label>
              <Input
                id="degree"
                name="degree"
                placeholder="Bachelor of Science in Computer Science"
                defaultValue={defaultValues.degree}
                required
                className="bg-background/50"
              />
              {state.error?.errors?.degree && (
                <p className="text-sm text-destructive">{state.error.errors.degree}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="institution">Institution</Label>
              <Input
                id="institution"
                name="institution"
                placeholder="Massachusetts Institute of Technology"
                defaultValue={defaultValues.institution}
                required
                className="bg-background/50"
              />
              {state.error?.errors?.institution && (
                <p className="text-sm text-destructive">
                  {state.error.errors.institution}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                name="year"
                type="number"
                min="1900"
                max="2099"
                step={1}
                placeholder="2022"
                defaultValue={defaultValues.year}
                required
                className="bg-background/50"
              />
              {state.error?.errors?.year && (
                <p className="text-sm text-destructive">{state.error.errors.year}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="logo">Logo URL (optional)</Label>
              <Input
                id="logo"
                name="logo"
                type="url"
                placeholder="https://example.com/logo.png"
                defaultValue={defaultValues.logo || ''}
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
                  ? 'Add Education'
                  : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

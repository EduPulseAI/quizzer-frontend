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
import { Pencil, Plus, Trash2 } from 'lucide-react';
import {
  updateAboutAction,
  useProfileStore,
  type About,
  type Language,
} from '@edupulse/profile';
import type { ApiResponse } from '@edupulse/api-client';

const initialState: ApiResponse<About> = {
  success: false,
  message: '',
  data: {
    bio: '',
    focus: [],
    interests: [],
    languages: [],
  },
};

const defaultLanguage: Language = {
  name: '',
  proficiency: 'Beginner',
  level: 25,
  flag: '',
};

export function AboutFormDialog() {
  const [open, setOpen] = useState(false);
  const { profile } = useProfileStore();
  const about = profile.about;

  const [languages, setLanguages] = useState<Language[]>(about.languages || []);

  const [state, formAction, isPending] = useActionState(
    updateAboutAction,
    { ...initialState, data: about }
  );

  useEffect(() => {
    if (state.success) {
      setOpen(false);
    }
  }, [state.success]);

  useEffect(() => {
    setLanguages(about.languages || []);
  }, [about.languages]);

  const addLanguage = () => {
    setLanguages([...languages, { ...defaultLanguage }]);
  };

  const removeLanguage = (index: number) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };

  const updateLanguage = (index: number, field: keyof Language, value: string | number) => {
    setLanguages(
      languages.map((lang, i) =>
        i === index ? { ...lang, [field]: value } : lang
      )
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" className="h-8 w-8">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit About</DialogTitle>
          <DialogDescription>
            Update your bio, focus areas, interests, and languages.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <input
            type="hidden"
            name="languages"
            value={JSON.stringify(languages)}
          />
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                placeholder="Tell us about yourself..."
                defaultValue={about.bio}
                required
                className="min-h-24 resize-none bg-background/50"
              />
              {state.error?.errors?.bio && (
                <p className="text-sm text-destructive">{state.error.errors.bio}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="focus">Focus Areas (comma-separated)</Label>
              <Input
                id="focus"
                name="focus"
                placeholder="Web Development, Mobile Apps, Cloud Architecture"
                defaultValue={about.focus?.join(', ')}
                className="bg-background/50"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="interests">Interests (comma-separated)</Label>
              <Input
                id="interests"
                name="interests"
                placeholder="Open Source, AI/ML, DevOps"
                defaultValue={about.interests?.join(', ')}
                className="bg-background/50"
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label>Languages</Label>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={addLanguage}
                  className="h-7 text-xs"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add
                </Button>
              </div>
              <div className="space-y-3">
                {languages.map((lang, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[1fr_1fr_auto] gap-2 p-2 rounded border border-border/50 bg-background/30"
                  >
                    <Input
                      placeholder="Language"
                      value={lang.name}
                      onChange={(e) => updateLanguage(index, 'name', e.target.value)}
                      className="bg-background/50 h-8 text-sm"
                    />
                    <select
                      value={lang.proficiency}
                      onChange={(e) => {
                        const proficiency = e.target.value;
                        const levelMap: Record<string, number> = {
                          Beginner: 25,
                          Intermediate: 50,
                          Advanced: 75,
                          Native: 100,
                        };
                        updateLanguage(index, 'proficiency', proficiency);
                        updateLanguage(index, 'level', levelMap[proficiency] || 25);
                      }}
                      className="h-8 text-sm rounded border border-input bg-background/50 px-2"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Native">Native</option>
                    </select>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => removeLanguage(index)}
                      className="h-8 w-8 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {languages.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-2">
                    No languages added yet
                  </p>
                )}
              </div>
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
              {isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

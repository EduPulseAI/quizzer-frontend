'use client';

import { deleteEducationAction, useProfileStore } from '@edupulse/profile';
import { Button } from '@feature/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@feature/ui/components/card';
import { GraduationCap, Trash2 } from 'lucide-react';
import { useTransition } from 'react';
import { EducationFormDialog } from './education-form-dialog';

export function EducationList() {
  const { credentials } = useProfileStore(state => state.profile);
  const education = credentials.education;

  const [isPending, startTransition] = useTransition();

  const handleDelete = (index: number) => {
    if (confirm('Are you sure you want to delete this education entry?')) {
      startTransition(async () => {
        await deleteEducationAction(index);
      });
    }
  };

  return (
    <Card className="glass-effect card-hover">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-blue-400" />
          Education
        </CardTitle>
        <EducationFormDialog mode="add" />
      </CardHeader>
      <CardContent className="space-y-4">
        {education.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No education added yet. Click the + button to add one.
          </p>
        ) : (
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div
                key={index}
                className="border border-border rounded-lg p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    {edu.logo && (
                      <img
                        src={edu.logo}
                        alt={edu.institution}
                        className="w-10 h-10 rounded object-contain"
                      />
                    )}
                    <div>
                      <h4 className="font-semibold">{edu.degree}</h4>
                      <p className="text-sm text-muted-foreground">
                        {edu.institution}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {edu.year}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <EducationFormDialog
                      mode="edit"
                      index={index}
                      education={edu}
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => handleDelete(index)}
                      disabled={isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

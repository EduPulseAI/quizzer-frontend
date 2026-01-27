'use client';

import { deleteExperienceAction, useProfileStore } from '@edupulse/profile';
import { Button } from '@feature/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@feature/ui/components/card';
import { Briefcase, Trash2 } from 'lucide-react';
import { useTransition } from 'react';
import { ExperienceFormDialog } from './experience-form-dialog';

export function ExperienceList() {
  const { experience } = useProfileStore(state => state.profile)

  const [isPending, startTransition] = useTransition();

  const handleDelete = (index: number) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      startTransition(async () => {
        await deleteExperienceAction(index);
      });
    }
  };

  return (
    <Card className="glass-effect card-hover">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-blue-400" />
          Work Experience
        </CardTitle>
        <ExperienceFormDialog mode="add" />
      </CardHeader>
      <CardContent className="space-y-4">
        {experience.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No work experience added yet. Click the + button to add one.
          </p>
        ) : (
          <div className="space-y-4">
            {experience.map((exp, index) => (
              <div
                key={index}
                className="border border-border rounded-lg p-4 space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold">{exp.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {exp.company} | {exp.period}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <ExperienceFormDialog
                      mode="edit"
                      index={index}
                      experience={exp}
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
                {exp.description && (
                  <p className="text-sm text-muted-foreground">
                    {exp.description}
                  </p>
                )}
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                )}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-2">
                    {exp.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

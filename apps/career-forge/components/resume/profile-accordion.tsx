'use client';

import { useTransition } from 'react';
import {
  deleteExperienceAction,
  deleteEducationAction,
  useProfileStore,
} from '@edupulse/profile';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@feature/ui/components/accordion';
import { Button } from '@feature/ui/components/button';
import { Briefcase, GraduationCap, Trash2, User } from 'lucide-react';
import { AboutFormDialog } from './about-form-dialog';
import { ExperienceFormDialog } from './experience-form-dialog';
import { EducationFormDialog } from './education-form-dialog';

export function ProfileAccordion() {
  const { profile } = useProfileStore();
  const { about, experience, credentials } = profile;

  return (
    <Accordion type="multiple" defaultValue={['about']} className="w-full">
      {/* About Section */}
      <AccordionItem value="about" className="border-border">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
              <User className="h-4 w-4 text-blue-400" />
            </div>
            <div className="text-left">
              <p className="font-medium">About</p>
              <p className="text-xs text-muted-foreground line-clamp-1 max-w-[200px]">
                {about?.bio ? about.bio.slice(0, 50) + '...' : 'Add your bio'}
              </p>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <AboutForm />
        </AccordionContent>
      </AccordionItem>

      {/* Work Experience Section */}
      <AccordionItem value="experience" className="border-border">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Briefcase className="h-4 w-4 text-blue-400" />
            </div>
            <div className="text-left">
              <p className="font-medium">Work Experience</p>
              <p className="text-xs text-muted-foreground">
                {experience.length} {experience.length === 1 ? 'position' : 'positions'}
              </p>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <ExperienceContent />
        </AccordionContent>
      </AccordionItem>


      {/* Education Section */}
      <AccordionItem value="education" className="border-border">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
              <GraduationCap className="h-4 w-4 text-blue-400" />
            </div>
            <div className="text-left">
              <p className="font-medium">Education</p>
              <p className="text-xs text-muted-foreground">
                {credentials.education.length}{' '}
                {credentials.education.length === 1 ? 'degree' : 'degrees'}
              </p>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <EducationContent />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function AboutForm() {
  const { profile } = useProfileStore();
  const { about } = profile;

  return (
    <div className="space-y-4 pt-2">
      <div className="flex justify-end">
        <AboutFormDialog />
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium text-muted-foreground">Bio</label>
        <p className="text-sm text-foreground/80 whitespace-pre-wrap">
          {about?.bio || 'No bio added yet'}
        </p>
      </div>
      {about?.focus && about.focus.length > 0 && (
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">Focus Areas</label>
          <div className="flex flex-wrap gap-1">
            {about.focus.map((item, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
      {about?.interests && about.interests.length > 0 && (
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">Interests</label>
          <div className="flex flex-wrap gap-1">
            {about.interests.map((item, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-xs rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
      {about?.languages && about.languages.length > 0 && (
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">Languages</label>
          <div className="flex flex-wrap gap-2">
            {about.languages.map((lang, i) => (
              <span key={i} className="text-xs text-muted-foreground">
                {lang.flag} {lang.name} ({lang.proficiency})
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ExperienceContent() {
  const { experience } = useProfileStore((state) => state.profile);
  const [isPending, startTransition] = useTransition();

  const handleDelete = (index: number) => {
    if (confirm('Delete this experience?')) {
      startTransition(async () => {
        await deleteExperienceAction(index);
      });
    }
  };

  return (
    <div className="space-y-3 pt-2">
      <div className="flex justify-end">
        <ExperienceFormDialog mode="add" />
      </div>
      {experience.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">
          No experience added yet
        </p>
      ) : (
        <div className="space-y-2">
          {experience.map((exp, index) => (
            <div
              key={index}
              className="border border-border rounded-lg p-3 hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm truncate">{exp.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {exp.company} &middot; {exp.period}
                  </p>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <ExperienceFormDialog mode="edit" index={index} experience={exp} />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 text-destructive hover:text-destructive"
                    onClick={() => handleDelete(index)}
                    disabled={isPending}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

function EducationContent() {
  const { credentials } = useProfileStore((state) => state.profile);
  const education = credentials.education;
  const [isPending, startTransition] = useTransition();

  const handleDelete = (index: number) => {
    if (confirm('Delete this education?')) {
      startTransition(async () => {
        await deleteEducationAction(index);
      });
    }
  };

  return (
    <div className="space-y-3 pt-2">
      <div className="flex justify-end">
        <EducationFormDialog mode="add" />
      </div>

      {education.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">
          No education added yet
        </p>
      ) : (
        <div className="space-y-2">
          {education.map((edu, index) => (
            <div
              key={index}
              className="border border-border rounded-lg p-3 hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm truncate">{edu.degree}</p>
                  <p className="text-xs text-muted-foreground">
                    {edu.institution} &middot; {edu.year}
                  </p>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <EducationFormDialog mode="edit" index={index} education={edu} />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 text-destructive hover:text-destructive"
                    onClick={() => handleDelete(index)}
                    disabled={isPending}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProfileAccordion;

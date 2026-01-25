import { Card, CardContent, CardHeader, CardTitle } from '@feature/ui/components/card';
import type {
  Profile,
  ExperienceItem,
  Education,
  TechnicalSkills,
} from '@edupulse/profile';

interface ResumePreviewProps {
  profile: Profile;
}

export function ResumePreview({ profile }: ResumePreviewProps) {
  const { personal, about, experience, credentials, technicalSkills } = profile;

  const fullName = `${personal?.firstName || 'Your'} ${personal?.lastName || 'Name'}`;
  const contactInfo = [
    personal?.email,
    personal?.phone,
    personal?.location,
  ]
    .filter(Boolean)
    .join(' | ');

  return (
    <Card className="glass-effect">
      <CardHeader>
        <CardTitle>Resume Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-white text-black p-8 rounded-lg min-h-[800px] shadow-xl">
          <div className="space-y-6">
            {/* Header */}
            <div className="border-b-2 border-blue-600 pb-4">
              <h2 className="text-3xl font-bold">{fullName}</h2>
              {personal?.title && (
                <p className="text-lg text-gray-700 font-medium">
                  {personal.title}
                </p>
              )}
              {contactInfo && (
                <p className="text-gray-600 text-sm mt-1">{contactInfo}</p>
              )}
            </div>

            {/* Summary */}
            {about?.bio && (
              <div>
                <h3 className="text-xl font-bold text-blue-600 mb-2">
                  SUMMARY
                </h3>
                <p className="text-sm text-gray-700 whitespace-pre-line">
                  {about.bio}
                </p>
              </div>
            )}

            {/* Technical Skills */}
            {technicalSkills && <TechnicalSkillsSection skills={technicalSkills} />}

            {/* Professional Experience */}
            {experience && experience.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-blue-600 mb-3">
                  PROFESSIONAL EXPERIENCE
                </h3>
                <div className="space-y-4">
                  {experience.map((exp, index) => (
                    <ExperienceSection key={index} experience={exp} />
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {credentials?.education && credentials.education.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-blue-600 mb-3">
                  EDUCATION
                </h3>
                <div className="space-y-2">
                  {credentials.education.map((edu, index) => (
                    <EducationSection key={index} education={edu} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TechnicalSkillsSection({ skills }: { skills: TechnicalSkills }) {
  const categories = [
    { label: 'Design', items: skills.design },
    { label: 'Development', items: skills.development },
    { label: 'UX Methods', items: skills.uxMethods },
    { label: 'Soft Skills', items: skills.softSkills },
  ].filter((cat) => cat.items && cat.items.length > 0);

  if (categories.length === 0) return null;

  return (
    <div>
      <h3 className="text-xl font-bold text-blue-600 mb-2">TECHNICAL SKILLS</h3>
      <table className="w-full text-sm">
        <tbody>
          {categories.map((category) => (
            <tr key={category.label} className="border-b border-gray-200">
              <td className="py-1 pr-4 font-semibold text-gray-700 w-32">
                {category.label}
              </td>
              <td className="py-1 text-gray-600">
                {category.items?.join(', ')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ExperienceSection({ experience }: { experience: ExperienceItem }) {
  return (
    <div className="pb-3 border-b border-gray-100 last:border-b-0">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-bold text-gray-900">{experience.title}</h4>
          <p className="text-sm text-gray-600 italic">{experience.company}</p>
        </div>
        <span className="text-sm text-gray-500">{experience.period}</span>
      </div>

      {experience.description && (
        <p className="text-sm text-gray-700 mt-2">{experience.description}</p>
      )}

      {experience.achievements && experience.achievements.length > 0 && (
        <ul className="mt-2 space-y-1">
          {experience.achievements.map((achievement, i) => (
            <li key={i} className="text-sm text-gray-700 flex">
              <span className="mr-2">•</span>
              <span>{achievement}</span>
            </li>
          ))}
        </ul>
      )}

      {experience.technologies && experience.technologies.length > 0 && (
        <p className="text-sm text-gray-600 mt-2">
          <span className="font-semibold">Environment: </span>
          {experience.technologies.join(', ')}
        </p>
      )}
    </div>
  );
}

function EducationSection({ education }: { education: Education }) {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h4 className="font-bold text-gray-900">{education.degree}</h4>
        <p className="text-sm text-gray-600">{education.institution}</p>
      </div>
      <span className="text-sm text-gray-500">{education.year}</span>
    </div>
  );
}

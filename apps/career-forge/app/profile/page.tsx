import { getProfile } from '@edupulse/profile';
import { Button } from '@feature/ui/components/button';
import { BriefcaseIcon, CodeIcon, GlobeIcon } from 'lucide-react';
import { notFound } from "next/navigation";
// import { ProjectCard } from "../../../components/profile/project-card"
import { ExperienceCard } from "../../components/profile/experience-card"
import { EnhancedScrollIndicator } from "../../components/profile/enhanced-scroll-indicator"
import { AnimatedSection } from "../../components/profile/animated-section"
import { EnhancedProfile } from "../../components/profile/enhanced-profile"
import { CredentialsSection } from "../../components/profile/credentials-section"
import { PortfolioHeader } from "../../components/profile/portfolio-header"
import type React from 'react';
import { Card, CardContent } from '@feature/ui/components/card';

interface Props {
  params: Promise<{ userId: string }>;
}

const SkillTagComponent = ({ children }: { children: React.ReactNode }) => {
  return <div className="px-2 py-1 bg-zinc-800 rounded-full text-xs font-medium text-zinc-400">{children}</div>
}

async function ProfilePage(props: Props) {
  const { success, data: profile, error }  = await getProfile();

  if (!success || error) {
    console.log("ProfilePage#error", error);
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px] opacity-20 z-0"></div>

      {/* Header */}
      <PortfolioHeader personalInfo={profile.personal}/>

      <div className="relative z-10 container mx-auto p-3 sm:p-4 pt-20 sm:pt-24 pb-6 sm:pb-8">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Enhanced Profile Section */}
          <div className="md:sticky md:top-24 self-start">
            <AnimatedSection animation="slide-right">
              <EnhancedProfile
                aboutInfo={profile.about}
                personalInfo={profile.personal}
              />
            </AnimatedSection>
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-3 space-y-4 sm:space-y-6">
            {/* Experience Section - Expanded */}
            <AnimatedSection animation="fade-up" id="experience">
              <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center mb-4 sm:mb-6">
                    <BriefcaseIcon className="w-5 h-5 mr-2 text-cyan-400" />
                    <h3 className="text-lg font-medium">Professional Experience</h3>
                  </div>

                  <div className="space-y-6 sm:space-y-8">
                    {profile.experience.map((experience, index) => (
                      <AnimatedSection key={index} animation="fade-up" delay={100 * (index + 1)}>
                        <ExperienceCard
                          title={experience.title}
                          company={experience.company}
                          period={experience.period}
                          description={experience.description}
                          achievements={experience.achievements}
                          technologies={experience.technologies}
                        />
                      </AnimatedSection>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Credentials Section */}
            <AnimatedSection animation="fade-up" id="credentials">
              <CredentialsSection credentials={profile.credentials}/>
            </AnimatedSection>

            {/* Skills Section */}
            <AnimatedSection animation="fade-up" id="skills">
              <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center mb-4">
                    <CodeIcon className="w-5 h-5 mr-2 text-cyan-400" />
                    <h3 className="text-lg font-medium">Technical Skills</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <AnimatedSection animation="slide-right" delay={100}>
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-zinc-400">Design</h4>
                        <div className="flex flex-wrap gap-2">
                          {profile.technicalSkills.design.map((skill, index) => (
                            <SkillTagComponent key={index}>{skill}</SkillTagComponent>
                          ))}
                        </div>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection animation="slide-left" delay={200}>
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-zinc-400">Development</h4>
                        <div className="flex flex-wrap gap-2">
                          {profile.technicalSkills.development.map((skill, index) => (
                            <SkillTagComponent key={index}>{skill}</SkillTagComponent>
                          ))}
                        </div>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection animation="slide-right" delay={300}>
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-zinc-400">UX Methods</h4>
                        <div className="flex flex-wrap gap-2">
                          {profile.technicalSkills.uxMethods.map((skill, index) => (
                            <SkillTagComponent key={index}>{skill}</SkillTagComponent>
                          ))}
                        </div>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection animation="slide-left" delay={400}>
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-zinc-400">Soft Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {profile.technicalSkills.softSkills.map((skill, index) => (
                            <SkillTagComponent key={index}>{skill}</SkillTagComponent>
                          ))}
                        </div>
                      </div>
                    </AnimatedSection>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Projects Section */}
            <AnimatedSection animation="fade-up" id="projects">
              <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="flex items-center">
                      <GlobeIcon className="w-5 h-5 mr-2 text-cyan-400" />
                      <h3 className="text-lg font-medium">Recent Projects</h3>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs sm:text-sm px-2 sm:px-3">
                      View All
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {/*{profile.projects.map((project, index) => (*/}
                    {/*  <AnimatedSection key={project.id} animation="zoom-in" delay={100 * (index + 1)}>*/}
                    {/*    <ProjectCard*/}
                    {/*      title={project.title}*/}
                    {/*      category={project.category}*/}
                    {/*      image={project.thumbnailImage}*/}
                    {/*      slug={project.slug}*/}
                    {/*    />*/}
                    {/*  </AnimatedSection>*/}
                    {/*))}*/}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>

        {/* Footer */}
        <AnimatedSection
          animation="fade-in"
          delay={500}
          className="mt-8 sm:mt-12 py-4 sm:py-6 text-center text-xs sm:text-sm text-zinc-500"
        >
          <p>© {new Date().getFullYear()} {profile.personal.firstName + " " + profile.personal.lastName}. All rights reserved.</p>
        </AnimatedSection>
      </div>

      {/* Scroll to Top Button */}
      <EnhancedScrollIndicator />
    </main>
  );
}

export default ProfilePage;

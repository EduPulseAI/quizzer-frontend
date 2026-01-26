import { streamText, tool, UIMessage, convertToModelMessages } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import {
  RESUME_ASSISTANT_PROMPT,
  PROFILE_CONTEXT_TEMPLATE,
} from '@edupulse/profile';
import { auth } from '@edupulse/profile';

const PROFILE_API_URL = process.env.PROFILE_API_URL || 'http://localhost:8084';

async function getAuthToken(): Promise<string | null> {
  const session = await auth();
  return session?.user?.jwtToken || null;
}

async function fetchProfile(token: string) {
  const response = await fetch(`${PROFILE_API_URL}/api/profiles/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch profile: ${response.status}`);
  }
  return response.json();
}

async function addExperience(
  token: string,
  data: {
    title: string;
    company: string;
    period: string;
    description?: string;
    achievements?: string[];
    technologies?: string[];
  }
) {
  const response = await fetch(`${PROFILE_API_URL}/api/profiles/experience`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to add experience: ${error}`);
  }
  return response.json();
}

async function addEducation(
  token: string,
  data: {
    degree: string;
    institution: string;
    year: string;
    logo?: string;
  }
) {
  const response = await fetch(`${PROFILE_API_URL}/api/profiles/education`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to add education: ${error}`);
  }
  return response.json();
}

async function updatePersonalInfo(
  token: string,
  data: {
    firstName?: string;
    lastName?: string;
    title?: string;
    location?: string;
    email?: string;
    phone?: string;
  }
) {
  const response = await fetch(`${PROFILE_API_URL}/api/profiles/personal`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to update personal info: ${error}`);
  }
  return response.json();
}

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const token = await getAuthToken();
  if (!token) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized', message: 'Please log in to use the resume assistant' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let profileContext = '';
  try {
    const profile = await fetchProfile(token);
    profileContext = PROFILE_CONTEXT_TEMPLATE(profile);
  } catch {
    profileContext = '## Current Profile\nNo profile data available.';
  }

  const systemPrompt = `${RESUME_ASSISTANT_PROMPT}\n\n${profileContext}`;

  const result = streamText({
    model: google('gemini-2.5-pro'),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
    tools: {
      getProfile: tool({
        description: 'Fetch the current user profile to see existing experiences, education, and skills',
        parameters: z.object({}),
        execute: async () => {
          try {
            const profile = await fetchProfile(token);
            return {
              success: true,
              data: profile,
            };
          } catch (error) {
            return {
              success: false,
              error: error instanceof Error ? error.message : 'Failed to fetch profile',
            };
          }
        },
      }),

      addExperience: tool({
        description: 'Add a new work experience entry to the user profile. Call this after the user confirms the extracted experience data.',
        parameters: z.object({
          title: z.string().describe('Job title (e.g., "Senior Software Engineer")'),
          company: z.string().describe('Company name'),
          period: z.string().describe('Time period in format "YYYY - YYYY" or "YYYY - Present"'),
          description: z.string().optional().describe('Job description and responsibilities'),
          achievements: z.array(z.string()).optional().describe('List of key achievements or accomplishments'),
          technologies: z.array(z.string()).optional().describe('Technologies, tools, or skills used'),
        }),
        execute: async (params) => {
          try {
            const result = await addExperience(token, params);
            return {
              success: true,
              message: 'Experience added successfully',
              data: result,
            };
          } catch (error) {
            return {
              success: false,
              error: error instanceof Error ? error.message : 'Failed to add experience',
            };
          }
        },
      }),

      addEducation: tool({
        description: 'Add a new education entry to the user profile. Call this after the user confirms the extracted education data.',
        parameters: z.object({
          degree: z.string().describe('Degree or certification name (e.g., "Bachelor of Science in Computer Science")'),
          institution: z.string().describe('School or institution name'),
          year: z.string().describe('Graduation year or period (e.g., "2020" or "2016 - 2020")'),
        }),
        execute: async (params) => {
          try {
            const result = await addEducation(token, params);
            return {
              success: true,
              message: 'Education added successfully',
              data: result,
            };
          } catch (error) {
            return {
              success: false,
              error: error instanceof Error ? error.message : 'Failed to add education',
            };
          }
        },
      }),

      updatePersonalInfo: tool({
        description: 'Update the user personal information like name, title, location, or contact details',
        parameters: z.object({
          firstName: z.string().optional().describe('First name'),
          lastName: z.string().optional().describe('Last name'),
          title: z.string().optional().describe('Professional title (e.g., "Full Stack Developer")'),
          location: z.string().optional().describe('Location (e.g., "San Francisco, CA")'),
          email: z.string().email().optional().describe('Email address'),
          phone: z.string().optional().describe('Phone number'),
        }),
        execute: async (params) => {
          try {
            const result = await updatePersonalInfo(token, params);
            return {
              success: true,
              message: 'Personal information updated successfully',
              data: result,
            };
          } catch (error) {
            return {
              success: false,
              error: error instanceof Error ? error.message : 'Failed to update personal info',
            };
          }
        },
      }),
    },
    maxSteps: 5,
  });

  return result.toUIMessageStreamResponse();
}

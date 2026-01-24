'use client';

import type { ApiResponse } from '@edupulse/api-client';
import type { Personal } from '@edupulse/profile';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@feature/ui/components/avatar';
import { Button } from '@feature/ui/components/button';
import { CardContent } from '@feature/ui/components/card';
import { Input } from '@feature/ui/components/input';
import { Label } from '@feature/ui/components/label';
import React, { useActionState, useState } from 'react';

interface Props {
  action: (
    prevState: ApiResponse<Personal>,
    formData: FormData
  ) => Promise<ApiResponse<Personal>>;
  initialState?: Personal;
}

export function ProfileSettingsContentForm({
  action,
  initialState = {
    name: '',
    lastName: '',
    title: '',
    location: '',
    avatar: '',
    email: '',
    phone: '',
    workingHours: '',
    availableForWork: false,
    badges: [],
    social: undefined,
  },
}: Props) {
  const [formState, formAction, isPending] = useActionState(action, {
    data: initialState,
  });

  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    formState?.data.avatar
  );

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      console.log('[v0] Avatar uploaded:', file.name);
    }
  };

  const displayError = (key: string) => {
    if (formState?.error?.errors && formState.error.errors[key]) {
      return (
        <div className="rounded-md px-3 text-sm text-red-700">
          {formState.error.errors[key]}
        </div>
      );
    }
    return null;
  };

  const displayMessage = () => {
    if (!formState.message) return null;

    const color = formState.success
      ? 'success'
      : formState.error
      ? 'destructive'
      : 'primary';
    return (
      <div
        className={`rounded-md bg-${color}-50 p-3 text-sm text-${color}-700`}
      >
        {formState.message}
      </div>
    );
  };

  const getInitials = (data: Personal) => {
    const first = (data.firstName ?? '').at(0) as string;
    const last = (data.lastName ?? '').at(0) as string;
    return (first + last).toUpperCase();
  };

  return (
    <form action={formAction}>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20 ring-2 ring-blue-500/50">
            <AvatarImage src={avatarPreview} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
              {getInitials(formState.data)}
            </AvatarFallback>
          </Avatar>
          <label htmlFor="avatar-upload">
            <Button
              variant="outline"
              className="cursor-pointer bg-transparent"
              asChild
            >
              <span>Change Avatar</span>
            </Button>
            <input
              id="avatar-upload"
              name="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarUpload}
            />
          </label>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              autoCapitalize={'on'}
              autoComplete="given-name"
              defaultValue={formState?.data.firstName}
              className="bg-background/50"
            />
            {displayError('firstName')}
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              autoCapitalize={'on'}
              autoComplete="family-name"
              defaultValue={formState?.data.lastName}
              className="bg-background/50"
            />
            {displayError('lastName')}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            defaultValue={formState?.data.email}
            className="bg-background/50"
          />
          {displayError('email')}
        </div>
        <div className="space-y-2">
          <Label htmlFor="title">Professional Title</Label>
          <Input
            id="title"
            name="title"
            autoComplete="organization-title"
            defaultValue={formState?.data?.title}
            className="bg-background/50"
          />
          {displayError('title')}
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            autoComplete="address-level2"
            defaultValue={formState?.data?.location}
            className="bg-background/50"
          />
          {displayError('location')}
        </div>
        <Button
          type="submit"
          disabled={isPending}
          className="bg-primary hover:bg-primary/90"
        >
          {isPending ? 'Saving...' : 'Save Changes'}
        </Button>
        {displayMessage()}
      </CardContent>
    </form>
  );
}

export default ProfileSettingsContentForm;

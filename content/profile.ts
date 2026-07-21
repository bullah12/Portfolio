export const profile = {
  name: "Abdullah Taj",
  role: "Data Engineer & Product Builder",
  supportingRole: "Senior Consultant",
  location: "United Kingdom",
  email: null as string | null,
  availability: null as string | null,
  github: "https://github.com/bullah12",
  linkedin: null as string | null,
  siteUrl: null as string | null,
  education: {
    award: "MEng (Hons) Chemical Engineering, including industrial year",
    institution: "University of Birmingham",
    dates: "2017–2022",
  },
  learning:
    "Working towards the Databricks Data Engineer Professional certification, with the aim of becoming a Databricks Champion.",
} as const;

export type Profile = typeof profile;

import { githubToken } from "./env";
import { unstable_cache as cache } from "next/cache";

export type ContributionLevel =
  | "NONE"
  | "FIRST_QUARTILE"
  | "SECOND_QUARTILE"
  | "THIRD_QUARTILE"
  | "FOURTH_QUARTILE";

export interface ContributionCalendar {
  totalContributions: number;
  weeks: {
    contributionDays: {
      date: string;
      weekday: number;
      contributionCount: number;
      contributionLevel: ContributionLevel;
    }[];
  }[];
}

const query = `query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays { date weekday contributionCount contributionLevel }
        }
      }
    }
  }
}`;

// Last 12 months of contributions from the GitHub GraphQL API.
export const getContributions = cache(
  async () => {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${githubToken}`,
        "Content-Type": "application/json",
        "User-Agent": "debertjamie.com",
      },
      body: JSON.stringify({ query, variables: { login: "debertjamie" } }),
    });
    if (!response.ok) throw new Error(`GitHub API ${response.status}`);
    const json = await response.json();
    if (json.errors) throw new Error(json.errors[0].message);
    return json.data.user.contributionsCollection
      .contributionCalendar as ContributionCalendar;
  },
  ["github-contributions"],
  { revalidate: 3600 },
);

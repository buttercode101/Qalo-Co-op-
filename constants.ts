
import { Scenario } from './types';

export const MOTIVATIONAL_QUOTES = [
  "Co-operatives are the future 💜",
  "Work towards being debt free… Live within your means. Delay that instant gratification 💜",
  "If 50,000 supporters contribute R250 monthly for 1 year, we will have R150 million.",
  "Be the first one in your family to OWN shares in a BANK.",
  "We survived, bruised and all… We came out stronger.",
  "The power of a collective — turn regular savings into powerful community investment."
];

export const PRESET_SCENARIOS: Scenario[] = [
  {
    name: "Siwelele Co-op",
    members: 50000,
    monthly: 250,
    duration: 12,
    rate: 8
  },
  {
    name: "Factory Setup",
    members: 10000,
    monthly: 250,
    duration: 4,
    rate: 8
  },
  {
    name: "Poultry Business",
    members: 10000,
    monthly: 200,
    duration: 12,
    rate: 8
  }
];

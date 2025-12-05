export type MemberType = "Active Member" | "Member";
export type ParticipantStatus = "Active" | "Inactive";

export interface Participant {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  age: number;
  incomeRange: string; // e.g., "Rp 10 - 25 Juta"
  registrationDate: Date;
  memberType: MemberType;
  status: ParticipantStatus;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
}





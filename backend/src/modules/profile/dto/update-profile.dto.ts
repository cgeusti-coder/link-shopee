
export class UpdateProfileDto {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneMain?: string; // Full phone for legacy or combined storage
    phoneDDD?: string;
    phoneNumber?: string;
    document?: string;
    notificationsEnabled?: boolean;
}

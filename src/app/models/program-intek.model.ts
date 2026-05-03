export interface ProgramIntek {
    IntekId: number;
    IntakeName: string;
    IntekDate: Date | string;
    ProgramId: number;
    IntekStatus: number;
    SubmissionDeadline: Date | string;
    OnshoreSubmissionDeadline: Date | string;
    Capacity: string;
    Campus: [];
    OfferLetterTAT: string;
    LOA_TAT: string;
    FeeReceiveTAT: string;
    RegionId?: number;
    ZoneId?: number;
    ConditionalApplication?: number;
    OnShore?: boolean;
    OffShore?: boolean;
    UsedOnShore?: boolean;
    UsedOffShore?: boolean;
}
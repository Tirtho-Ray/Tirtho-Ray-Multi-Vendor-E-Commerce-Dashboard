/* eslint-disable @typescript-eslint/no-explicit-any */

type TAddress = {
  street: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
};

type TSocialLinks = {
  facebook?: string;
  instagram?: string;
  twitter?: string;
};

type TBankDetails = {
  accountName: string;
  accountNumber: string;
  bankName: string;
  ifscCode?: string;
};

type TDocument = {
  nationalId: string;
  tradeLicense?: string;
  otherDocs?: Array<{ name: string; url: string }>;
};

type TBlockInfo = {
  reason?: string;
  blockedBy?: string;
  blockedAt?: Date;
};
// "userId: {
//                 "_id": "690303b8725ea3a07f247a5b",
//                 "name": "user",
//                 "email": "debraytirtho@gmail.com",
//                 "status": "ACTIVE",
//                 "id": "690303b8725ea3a07f247a5b"
//             },

type TUserID ={
    _id:string;
    name:string;
    email:string;
    status:string
}

type TapprovedBy ={
    name:string;
    email:string
}
export interface TVendor {
    _id:string;
  userId: TUserID;
  shopName: string;
  email: string;
  phone: string;
  address: TAddress;
  logoImg?: string;
  bannerImg?: string;
  description: string;
  website?: string;

  isVerified: boolean;
  isActive: boolean;

  isBlocked: boolean;
  blockInfo?: TBlockInfo | null;

  rating?: number;
  socialLinks?: TSocialLinks;
  bankDetails: TBankDetails;
  documents: TDocument;

  status: 'pending' | 'approved' | 'rejected' | 'misInfo';
  businessType: 'individual' | 'company' | 'reseller' | 'manufacturer';
  productCategories: any;

  approvedBy?:TapprovedBy;
  approvalDate?: Date;
  createdAt:string
  updatedAt:string
}

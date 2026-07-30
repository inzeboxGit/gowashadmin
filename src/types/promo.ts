export enum PromoDiscountType {
  percentage = 'percentage',
  fixed = 'fixed',
}

export interface Promo {
  id?: string;
  code: string;
  discountType: PromoDiscountType | string;
  discountValue: number;
  isActive: boolean;
  allowedUserId: string | null;
  userMax: number;
  minimumOrderAmount: number;
  maximumDiscountAmount: number | null;
  startsAt: string | Date | null;
  expiresAt: string | Date | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

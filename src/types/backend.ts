export interface User {
    id?: string | number; // Some backends use UUID, others ID
    username: string;
    name?: string;
    email?: string;
    role: string;
    token?: string; // Optional as it's in cookie usually
    avatar?: string;
    createdAt?: string;
    description?: string; // Bio or About for providers
}

export interface AuthResponse {
    token: string;
    username: string;
    role: string;
}

export interface UserRequest {
    email?: string;
    password?: string;
}

export interface CustomerProfile {
    id?: number;
    name: string;
    email: string;
    phone: string;
    fullAddress: string;
    state: string;
    city: string;
    pincode: string;
    profilePicture?: string;
}

export interface CustomerProfileUpdateRequest {
    name: string;
    phone: string;
    fullAddress: string;
    state: string;
    city: string;
    pincode: string;
}

export interface DashboardProviderDto {
    id: number;
    fullName: string;
    serviceCategory: string;
    profilePicture: string; // URL?
    serviceArea: string;
    businessName: string;
    experience: number;
    bio: string;
    availability: string;
    mobileNumber: string;
}

export enum ServiceType {
    PLUMBING = "PLUMBING",
    CLEANING = "CLEANING",
    ELECTRICAL = "ELECTRICAL",
    PAINTING = "PAINTING",
    REPAIRS = "REPAIRS",
    APPLIANCE_REPAIRS = "APPLIANCE_REPAIRS",
    CARPENTRY = "CARPENTRY",
    COOKING_SERVICES = "COOKING_SERVICES"
}

export enum PaymentMethod {
    CREDIT_CARD = "CREDIT_CARD",
    DEBIT_CARD = "DEBIT_CARD",
    NET_BANKING = "NET_BANKING",
    UPI = "UPI",
    CASH_AFTER_SERVICE = "CASH_AFTER_SERVICE"
}

export interface BookingRequest {
    providerId: number;
    serviceType: ServiceType;
    bookingDateTime: string; // LocalDateTime
    priceEstimate: number; // BigDecimal
    finalPrice: number; // BigDecimal
    paymentMethod: PaymentMethod;
    note?: string;
}

export interface ApiResponse {
    status: string;
    message: string;
}

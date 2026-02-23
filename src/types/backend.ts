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
    access_token: string;
    refresh_token: string | null;
    token_type: string;
    expires_in?: number;
}

export interface DecodedToken {
    role: string;
    user_id: number;
    profile_id: number;
    sub: string; // email
    iat: number;
    exp: number;
}

export interface UserRequest {
    email?: string;
    password?: string;
}

// Response from GET /api/customer/profile
export interface CustomerProfileResponse {
    id: number;
    fullName: string;
    mobileNumber: string;
    email: string;
    photograph: string;
    address: {
        id: number;
        fullAddress: string;
        state: string;
        city: string;
        pincode: string;
    };
    createdAt: string;
    updatedAt: string;
}

// Request body for PUT /api/customer/profile
export interface CustomerProfileUpdateRequest {
    name: string;
    phone: string;
    fullAddress: string;
    state: string;
    city: string;
    pincode: string;
}

// Legacy interface (keep for now or refactor usages)
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

export interface LoginRequest {
    email: string;
    password?: string;
}

// Duplicate AuthResponse removed

export interface ProviderRegistrationData {
    fullName: string;
    dob: string;
    mobileNumber: string;
    email: string;
    photograph: File | null;
    businessName: string;
    serviceCategory: string;
    serviceArea: string;
    experience: number;
    languages: string;
    fullAddress: string;
    state: string;
    city: string;
    pincode: string;
    govtId: File | null;
    gstin: string;
    qualification: File | null;
    policeVerification: File | null;
    bio: string;
    profilePicture: File | null;
    availability: string;
    agreeToS: boolean;
    agreeToBgCheck: boolean;
}

export interface PincodeInfo {
    pincode: string;
    areaName: string;
}

export interface PublicCityResponse {
    cityName: string;
    state: string;
    pincodes: PincodeInfo[];
}

export interface BookingItem {
    id: string;
    serviceName: string;
    providerName: string;
    bookingDate: string;
    status: string;
    amount: number;
}

export interface CustomerDashboardResponse {
    totalBookings: number;
    totalSpent: number;
    pendingBookings: number;
    averageRating: number;
    recentBookings: BookingItem[];
}

export interface PendingBookingItem {
    bookingId: string;
    customerName: string;
    serviceType: string;
    bookingDateTime: string;
    priceEstimate: number;
    note: string;
    status: string;
    createdAt: string;
}

export interface ReviewResponseDto {
    id: number;
    bookingId: string;
    customerId: number;
    customerName: string;
    providerId: number;
    rating: number;
    comment: string;
    createdAt: string;
}

export interface PastServiceItem {
    bookingId: string;
    customerName: string;
    serviceType: string;
    bookingDateTime: string;
    finalPrice?: number;
    status: string;
    completedAt: string;
}

export interface ProviderDashboardResponse {
    totalEarnings: number;
    completedJobs: number;
    pendingRequestsCount: number;
    averageRating: number;
    pendingBookings: PendingBookingItem[];
    recentReviews?: ReviewResponseDto[];
    recentPastServices?: PastServiceItem[];
}

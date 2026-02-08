import json
import os
import subprocess

# Read existing JSON output
with open('/home/yjamal/.gemini/antigravity/brain/bdd01d05-b893-4a43-87f6-20c10327a7bc/.system_generated/steps/162/output.txt', 'r') as f:
    data = json.load(f)

# Mapping of Title to Filename
screen_mapping = {
    "Admin - Service Category Management": "admin_services.html",
    "Provider Earnings and Payouts": "provider_earnings.html",
    "Provider Onboarding - Verification": "provider_onboarding_verification.html",
    "Provider Onboarding - Setup Profile": "provider_onboarding_profile.html",
    "Provider Onboarding - Business Info": "provider_onboarding_info.html",
    "Booking Confirmation Success": "booking_success.html",
    "OTP Email Verification Screen": "otp_verification.html",
    "Service Rating and Review Modal": "reviews.html"
}

# Download files
for screen in data['screens']:
    title = screen.get('title')
    if title in screen_mapping:
        filename = screen_mapping[title]
        download_url = screen['htmlCode']['downloadUrl']
        print(f"Downloading {title} to {filename}...")
        try:
            subprocess.run(['curl', '-L', '-o', filename, download_url], check=True)
            print(f"Successfully downloaded {filename}")
        except subprocess.CalledProcessError as e:
            print(f"Failed to download {filename}: {e}")

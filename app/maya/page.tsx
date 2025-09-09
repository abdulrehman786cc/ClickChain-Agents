"use client"

import { useEffect, useState } from 'react';
import MayaFlowDashboard from "@/maya-dashboard";
import SignupForm from "@/components/signup-form";

export default function MayaPage() {
    const [isClient, setIsClient] = useState(false);
    const [hasSignedUp, setHasSignedUp] = useState(false);

    useEffect(() => {
        setIsClient(true);
        // Check if user has signed up for Maya
        try {
            const hasSubmitted = localStorage.getItem('signup_maya_submitted');
            if (hasSubmitted) {
                setHasSignedUp(true);
            }
        } catch (error) {
            console.log('Could not access localStorage:', error);
        }
    }, []);

    if (!isClient) {
        return <div className="min-h-screen bg-[#111a26] text-white flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">LocalFlow Dashboard</h1>
                <p className="text-gray-400">Loading...</p>
            </div>
        </div>;
    }

    // Show signup form if user hasn't signed up yet
    if (!hasSignedUp) {
        return (
            <SignupForm
                flowType="maya"
                title=""
                description="Enter your information to get started with LocalFlow"
                buttonText="Continue to LocalFlow"
                redirectUrl="/maya"
            />
        );
    }

    return <MayaFlowDashboard />;
}

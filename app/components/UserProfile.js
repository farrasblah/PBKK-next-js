// components/UserProfile.js
'use client'; // This line makes the component a client component

import { useUser  } from '@clerk/nextjs';
import { useEffect } from 'react';

const UserProfile = () => {
    const { user, isSignedIn } = useUser ();

    useEffect(() => {
        const storeUser, InDatabase = async () => {
            if (isSignedIn && user) {
                const response = await fetch('/api/createUser ', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        clerkUser_Id: clerk_user_id,
                    }),
                });

                if (!response.ok) {
                    console.error('Failed to store user in database');
                }
            }
        };

        storeUser, InDatabase();
    }, [isSignedIn, user]);

    if (!isSignedIn) {
        return <div>Please sign in to see your profile.</div>;
    }

    return (
        <div>
            <p>Your User ID is: {clerk_user_id}</p>
        </div>
    );
};

export default UserProfile;
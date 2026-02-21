import React, { useState, useEffect } from 'react';
import { GOOGLE_CLIENT_ID } from '../constants';
import { clearAuthToken, getAuthUserFromToken, getStoredAuthUser, persistAuthToken } from '../services/authSession';
import { getRegistrations } from '../services/googleSheets';
import { Loader2, AlertCircle, LayoutDashboard, User, LogOut, Ticket, Calendar } from 'lucide-react';

// Declare google global for TypeScript
declare const google: any;

const Dashboard: React.FC = () => {
    const [user, setUser] = useState<{ name: string; email: string; picture: string } | null>(null);
    const [registrations, setRegistrations] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const canRegisterMore = registrations.length < 14;

    const handleCredentialResponse = (response: any) => {
        const authUser = getAuthUserFromToken(response.credential);
        if (authUser) {
            persistAuthToken(response.credential);
            setUser({
                name: authUser.name,
                email: authUser.email,
                picture: authUser.picture
            });
            fetchData(authUser.email);
        }
    };

    const fetchData = async (email: string) => {
        setLoading(true);
        const response = await getRegistrations(email);
        setLoading(false);
        if (response.status === 'success' && response.data) {
            setRegistrations(response.data);
        } else {
            setMessage(response.message || 'Failed to load registrations.');
        }
    };

    const handleSignOut = () => {
        clearAuthToken();
        setUser(null);
        setRegistrations([]);
        setMessage('');
    };

    useEffect(() => {
        const storedUser = getStoredAuthUser();
        if (storedUser) {
            setUser(storedUser);
            fetchData(storedUser.email);
        }
    }, []);

    useEffect(() => {
        const renderGoogleButton = () => {
            const buttonContainer = document.getElementById("googleSignInDivDashboard");
            if (typeof google !== 'undefined' && buttonContainer) {
                try {
                    const buttonWidth = Math.min(Math.max(buttonContainer.clientWidth || 250, 220), 400);
                    buttonContainer.innerHTML = '';

                    google.accounts.id.initialize({
                        client_id: GOOGLE_CLIENT_ID,
                        callback: handleCredentialResponse
                    });
                    google.accounts.id.renderButton(
                        buttonContainer,
                        { theme: "filled_black", size: "large", width: buttonWidth, text: "continue_with" }
                    );
                } catch (e) {
                    console.error("Google Sign In Error:", e);
                }
            }
        };

        if (!user) {
            if (typeof google !== 'undefined') {
                renderGoogleButton();
            } else {
                const interval = setInterval(() => {
                    if (typeof google !== 'undefined') {
                        renderGoogleButton();
                        clearInterval(interval);
                    }
                }, 500);
                return () => clearInterval(interval);
            }
        }
    }, [user]);

    return (
        <div className="pt-24 min-h-screen bg-darker flex flex-col items-center p-4 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"></div>

        <div className="w-full max-w-5xl z-10">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black text-white font-mono tracking-tighter uppercase flex items-center gap-3">
                        <LayoutDashboard className="w-10 h-10 text-primary" /> User Dashboard
                    </h1>
                    <p className="text-gray-400 mt-2">Manage your participations and view event details.</p>
                </div>

                {user && (
                    <div className="w-full md:w-auto min-w-0 flex items-center gap-3 bg-white/5 border border-white/10 p-2 pr-3 md:pr-4 rounded-2xl md:rounded-full">
                        <img src={user.picture} alt="Profile" className="w-10 h-10 rounded-full border border-primary" referrerPolicy="no-referrer" />
                        <div className="min-w-0">
                            <p className="text-sm font-bold text-white truncate">{user.name}</p>
                            <p className="text-xs text-secondary truncate">{user.email}</p>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="ml-auto p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                            title="Sign Out"
                        >
                            <LogOut className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>

                {!user ? (
                    <div className="flex flex-col items-center justify-center min-h-[400px] bg-card/60 backdrop-blur-xl border border-white/10 rounded-2xl p-10 animate-fade-in-up">
                        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,0,85,0.3)]">
                            <User className="w-10 h-10 text-primary" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">Please Sign In to Access Dashboard</h2>
                        <div id="googleSignInDivDashboard" className="h-[44px] w-full max-w-[250px]"></div>
                    </div>
                ) : (
                    <div className="bg-card/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 md:p-8 min-h-[400px]">
                        <div className="mb-6 border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                                <Ticket className="w-6 h-6 text-secondary" /> Registered Events
                            </h2>
                            {!loading && canRegisterMore && (
                                <a
                                    href="#/register"
                                    className="inline-flex items-center justify-center w-full sm:w-auto px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-white hover:text-primary transition-all whitespace-nowrap"
                                >
                                    REGISTER
                                </a>
                            )}
                        </div>

                        {loading ? (
                            <div className="flex items-center justify-center py-20">
                                <Loader2 className="w-10 h-10 animate-spin text-primary" />
                            </div>
                        ) : registrations.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {registrations.map((event, index) => (
                                    <div key={index} className="bg-black/40 border border-white/5 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1">
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{event.title}</h3>
                                        <div className="flex items-center text-gray-400 text-sm mb-4">
                                            <Calendar className="w-4 h-4 mr-2 text-secondary" />
                                            {event.date}
                                        </div>
                                        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
                                            <span className="text-xs font-bold bg-green-500/20 text-green-400 px-2 py-1 rounded">REGISTERED</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-black/20 rounded-xl border border-white/5 border-dashed">
                                <p className="text-gray-400 mb-4">You haven't registered for any events yet.</p>
                                <a href="#/register" className="inline-block px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-white hover:text-primary transition-all">
                                    Register Now
                                </a>
                            </div>
                        )}

                        {message && (
                            <div className="mt-6 flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-lg border border-red-500/20">
                                <AlertCircle className="w-5 h-5 shrink-0" />
                                <p className="text-sm">{message}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;

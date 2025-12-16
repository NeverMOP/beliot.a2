
'use client';

import * as React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getCompanies } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Building, X } from 'lucide-react';

export function CompanyContextSwitcher() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const companyId = searchParams.get('companyId');
    
    const [companyName, setCompanyName] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (companyId) {
            const id = parseInt(companyId, 10);
            const companies = getCompanies();
            const currentCompany = companies.find(c => c.id === id);
            setCompanyName(currentCompany ? currentCompany.name : 'Неизвестная компания');
        } else {
            setCompanyName(null);
        }
    }, [companyId]);

    const handleExitContext = () => {
        const params = new URLSearchParams(searchParams);
        params.delete('companyId');
        // Redirect to dashboard without company context
        router.push(`/dashboard?${params.toString()}`);
    };

    if (!companyId || !companyName) {
        return null;
    }

    return (
        <div className="flex items-center gap-2 rounded-md bg-primary/10 px-3 py-1.5 text-sm text-primary-foreground">
            <Building className="h-4 w-4" />
            <span className="font-medium">{companyName}</span>
            <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded-full hover:bg-white/20"
                onClick={handleExitContext}
            >
                <X className="h-4 w-4" />
                <span className="sr-only">Выйти из контекста компании</span>
            </Button>
        </div>
    );
}

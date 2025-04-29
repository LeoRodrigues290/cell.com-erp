import { Link } from 'react-router';
import BlogCards from 'src/components/dashboard/BlogCards';
import DailyActivity from 'src/components/dashboard/DailyActivity';
import NewCustomers from 'src/components/dashboard/NewCustomers';
import ProductRevenue from 'src/components/dashboard/ProductRevenue';
import { RevenueForecast } from 'src/components/dashboard/RevenueForecast';
import TotalIncome from 'src/components/dashboard/TotalIncome';

const Dashboard = () => {
    return (
        <div className="grid grid-cols-12 gap-30">

            {/* Parte do meio que você quer ajustar */}
            <div className="lg:col-span-8 col-span-12 flex flex-col h-full">
                <ProductRevenue className="flex-1" />
            </div>

            <div className="lg:col-span-4 col-span-12 flex flex-col h-full space-y-4">
                <TotalIncome />
                <DailyActivity />
            </div>

        </div>
    );
};

export default Dashboard;

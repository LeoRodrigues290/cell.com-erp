import DailyActivity from 'src/components/dashboard/DailyActivity';
import ProductRevenue from 'src/components/dashboard/ProductRevenue';
import TotalIncome from 'src/components/dashboard/TotalIncome';

const Dashboard = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* charts principais */}
                <div className="lg:col-span-8 col-span-1 flex flex-col">
                    <ProductRevenue className="flex-1" />
                </div>
                {/* lado direito */}
                <div className="lg:col-span-4 col-span-1 flex flex-col space-y-6">
                    <TotalIncome />
                    <DailyActivity />
                </div>
            </div>
        </div>
    )
}

export default Dashboard


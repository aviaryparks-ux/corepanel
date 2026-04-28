import { NextResponse } from "next/server";
import { getVisitorStats, getTodayStats, getTotalVisitors } from "../../../lib/firebase";

export async function GET() {
  try {
    const [today, weekStats, total] = await Promise.all([
      getTodayStats(),
      getVisitorStats(7),
      getTotalVisitors(),
    ]);

    // Calculate average per day for the last 7 days
    const weekValues = Object.values(weekStats) as any[];
    const totalWeek = weekValues.reduce((sum, day) => sum + (day.count || 0), 0);
    const avgPerDay = Math.round(totalWeek / 7);

    // Calculate trend (compare today vs yesterday)
    const dates = Object.keys(weekStats).sort();
    const todayDate = dates[dates.length - 1];
    const yesterdayDate = dates[dates.length - 2];
    const todayCount = weekStats[todayDate]?.count || 0;
    const yesterdayCount = weekStats[yesterdayDate]?.count || 0;
    const trend = yesterdayCount > 0 ? Math.round(((todayCount - yesterdayCount) / yesterdayCount) * 100) : 0;

    return NextResponse.json({
      today: todayCount,
      total,
      avgPerDay,
      trend,
      weekStats,
    });
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengambil statistik" }, { status: 500 });
  }
}

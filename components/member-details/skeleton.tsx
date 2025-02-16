"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function MemberDetailsSkeleton() {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          <Skeleton className="w-40 h-6" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-foreground">תאריך לידה:</h3>
            <div className="text-muted-foreground">
              <Skeleton className="w-24 h-5" />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">תאריך הצטרפות:</h3>
            <div className="text-muted-foreground">
              <Skeleton className="w-24 h-5" />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">כיתה:</h3>
            <div className="text-muted-foreground">
              <Skeleton className="w-24 h-5" />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">כתובת:</h3>
            <div className="text-muted-foreground">
              <Skeleton className="w-24 h-5" />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold text-foreground">מספרי טלפון:</h3>
          <div className="text-muted-foreground">
            <Skeleton className="w-24 h-5" />
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold text-foreground">תחביבים:</h3>
          <div className="text-muted-foreground">
            <Skeleton className="w-24 h-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

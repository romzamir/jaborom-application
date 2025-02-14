import { format } from "date-fns";
import { he } from "date-fns/locale";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Member } from "@/types/member";
import { gradeToHebrewName } from "@/utils/grade";

export default function MemberDetails({ member }: { member: Member }) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {member.firstName} {member.lastName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-foreground">תאריך לידה:</h3>
            <p className="text-muted-foreground">
              {member.birthDate
                ? format(member.birthDate, "dd/MM/yyyy", { locale: he })
                : "לא הוזן תאריך לידה"}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">תאריך הצטרפות:</h3>
            <p className="text-muted-foreground">
              {format(member.joinDate, "dd/MM/yyyy", { locale: he })}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">כיתה:</h3>
            <p className="text-muted-foreground">
              {gradeToHebrewName(member.grade)}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">עיר:</h3>
            <p className="text-muted-foreground">{member.address?.city}</p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">כתובת:</h3>
            <p className="text-muted-foreground">
              {member.address?.street} {member.address?.houseNumber}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold text-foreground">מספרי טלפון:</h3>
          <ul className="text-muted-foreground">
            {member.phones.map((phone, index) => (
              <li key={index}>
                {phone.title}: {phone.number}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold text-foreground">תחביבים:</h3>
          <p className="text-muted-foreground">{member.hobbies.join(", ")}</p>
        </div>
      </CardContent>
    </Card>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { gradeToHebrewName } from "@/lib/mockData";

interface Member {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  birthDate: string;
  joinDate: string;
  grade: number;
  address: {
    street: string;
    houseNumber: string;
  };
  phones: Array<{
    title: string;
    number: string;
  }>;
  hobbies: string[];
}

export default function MemberDetails({ member }: { member: Member }) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {member.firstName} {member.lastName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">תאריך לידה:</h3>
            <p>{member.birthDate}</p>
          </div>
          <div>
            <h3 className="font-semibold">תאריך הצטרפות:</h3>
            <p>{member.joinDate}</p>
          </div>
          <div>
            <h3 className="font-semibold">כיתה:</h3>
            <p>{gradeToHebrewName(member.grade)}</p>
          </div>
          <div>
            <h3 className="font-semibold">עיר:</h3>
            <p>{member.city}</p>
          </div>
          <div>
            <h3 className="font-semibold">כתובת:</h3>
            <p>
              {member.address.street} {member.address.houseNumber}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold">מספרי טלפון:</h3>
          <ul>
            {member.phones.map((phone, index) => (
              <li key={index}>
                {phone.title}: {phone.number}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold">תחביבים:</h3>
          <p>{member.hobbies.join(", ")}</p>
        </div>
      </CardContent>
    </Card>
  );
}

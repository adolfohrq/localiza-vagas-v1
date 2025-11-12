import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const leaderboardData = [
  { rank: 1, name: "João Silva", points: 1250, avatar: "/avatars/joao.jpg" },
  { rank: 2, name: "Maria Santos", points: 1100, avatar: "/avatars/maria.jpg" },
  { rank: 3, name: "Pedro Oliveira", points: 950, avatar: "/avatars/pedro.jpg" },
  { rank: 4, name: "Ana Rodrigues", points: 900, avatar: "/avatars/ana.jpg" },
  { rank: 5, name: "Carlos Ferreira", points: 850, avatar: "/avatars/carlos.jpg" },
]

export function Leaderboard() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Posição</TableHead>
          <TableHead>Candidato</TableHead>
          <TableHead className="text-right">Pontos</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leaderboardData.map((entry) => (
          <TableRow key={entry.rank}>
            <TableCell className="font-medium">{entry.rank}</TableCell>
            <TableCell>
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={entry.avatar} alt={entry.name} />
                  <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {entry.name}
              </div>
            </TableCell>
            <TableCell className="text-right">{entry.points}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}


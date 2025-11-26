import Badge from '@/components/ui/Badge'

interface TechStackProps {
  techs: string[]
}

export default function TechStack({ techs }: TechStackProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {techs.map((tech) => (
        <Badge key={tech} variant="default">
          {tech}
        </Badge>
      ))}
    </div>
  )
}


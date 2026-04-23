interface EntityDetailProps {
  entityId: string;
}

const EntityDetail = ({ entityId }: EntityDetailProps) => {
  return (
    <div className="text-2xl">Entity Detail for {entityId} - Coming Soon</div>
  );
};

export default EntityDetail;

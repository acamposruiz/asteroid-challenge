export interface Response {
  element_count: number
  links: RootObjectLinks
  near_earth_objects: Record<string, Asteroid[]>
}

export interface RootObjectLinks {
  next: string
  previous: string
  self: string
}

export interface Asteroid {
  absolute_magnitude_h: number
  close_approach_data: CloseApproachDatum[]
  estimated_diameter: EstimatedDiameter
  id: string
  is_potentially_hazardous_asteroid: boolean
  is_sentry_object: boolean
  links: NearEarthObjectLinks
  name: string
  nasa_jpl_url: string
  neo_reference_id: string
}

export interface CloseApproachDatum {
  close_approach_date: Date
  close_approach_date_full: string
  epoch_date_close_approach: number
  miss_distance: MissDistance
  orbiting_body: OrbitingBody
  relative_velocity: RelativeVelocity
}

export interface MissDistance {
  astronomical: string
  kilometers: string
  lunar: string
  miles: string
}

export enum OrbitingBody {
  Earth = 'Earth',
}

export interface RelativeVelocity {
  kilometers_per_hour: string
  kilometers_per_second: string
  miles_per_hour: string
}

export interface EstimatedDiameter {
  feet: Feet
  kilometers: Feet
  meters: Feet
  miles: Feet
}

export interface Feet {
  estimated_diameter_max: number
  estimated_diameter_min: number
}

export interface NearEarthObjectLinks {
  self: string
}

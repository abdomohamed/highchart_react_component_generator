# Highcharts Visualization with LLM-Generated React Components

This repository demonstrates a methodology for leveraging Large Language Models (LLMs) to generate React visualization components based on the Highcharts schema. It provides a structured approach to prompting LLMs, along with validation strategies to ensure the generated code works correctly.

## Repository Structure

- **`high_chart_schema.json`**: The Highcharts schema that defines chart types and configuration options
- **`agent_task_conversation.md`**: Conversation log documenting the approach for creating and validating chart components
- **`examples/`**: Directory containing example implementations and validation tools
  - **`GeoHeatmap.tsx`**: Example implementation of a React GeoHeatmap component
  - **`GeoHeatmap.test.tsx`**: Test file for validating the GeoHeatmap component
  - **`App.tsx`**: Demo application showcasing the GeoHeatmap component with different datasets
  - **`geoheatmap_prompt.md`**: Example prompt for an LLM to generate a GeoHeatmap component
  - **`validation_checklist.md`**: Checklist for validating generated visualization components
  - **`validation_instructions.md`**: Instructions for testing and validating the generated code

## Methodology

### 1. Understanding the Schema

The repository uses the Highcharts schema (`high_chart_schema.json`) to extract information about chart types, their configuration options, and documentation. This information is used to create structured prompts for LLMs.

### 2. Structured Prompting Approach

When prompting an LLM to generate a visualization component, the repository recommends:

1. Defining the specific chart type from the schema (e.g., geoheatmap)
2. Extracting documentation for that chart type to understand its purpose
3. Identifying required properties from the schema
4. Providing sample data that matches the chart's requirements
5. Specifying TypeScript typings and other technical requirements

### 3. Validation Strategy

The repository includes a comprehensive validation strategy for LLM-generated visualization components:

- **Static Analysis**: TypeScript compilation, ESLint checks, type verification
- **Functional Requirements**: Component rendering, proper lifecycle management, module imports
- **Visual Validation**: Chart rendering, colors, tooltips, responsiveness
- **Edge Cases**: Handling empty data, invalid coordinates, extreme values
- **Documentation**: Usage examples, prop documentation, implementation notes

## Example Implementation: GeoHeatmap

The repository includes a complete example of a GeoHeatmap visualization component:

- **Component**: A React component that renders geographic data as a heatmap
- **Props Interface**: Typed props for data, title, color axis, map data, and dimensions
- **Testing**: Jest tests to validate rendering, props, and error handling
- **Demo Application**: An interactive demo with multiple datasets and color schemes

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install highcharts highcharts-react-official react react-dom @types/react @types/react-dom
   ```
3. Review the example prompt in `examples/geoheatmap_prompt.md`
4. Generate a component using an LLM with the provided prompt
5. Validate the generated component using the validation checklist
6. Implement the component in your own application

## Validation Process

When validating a generated component:

1. Check that it compiles without TypeScript errors
2. Verify all imports and dependencies are correct
3. Run the component with sample data and check visual output
4. Test edge cases like empty data arrays
5. Verify that the component cleans up properly when unmounted

## Contributing

Contributions to improve the prompting methodology or validation strategies are welcome. Please submit a pull request with your proposed changes.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
